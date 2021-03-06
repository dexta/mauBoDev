function playFromList(num) {
  if(audioList[num]||false) {
    document.getElementById(audioList[num].uID).play()
  } else { return 0}
}

function toggleClass(elm,cla) {
  let tf = false;
  if(document.getElementById(elm).classList.contains(cla)) {
    document.getElementById(elm).classList.remove(cla);
    tf = true;
  } else {
    document.getElementById(elm).classList.add(cla);
    tf = false;
  }
  updateStateSectionView(elm,cla,tf);
}

var viewConfigList = [];
function setSectionView(configList) {
  viewConfigList = configList;
  // console.dir(configList);
  for(var c in configList) {
    var elmen = document.getElementById(configList[c].key);
    if(elmen === null) continue;
    if(configList[c].value===false) {
      elmen.classList.add("d-none");
    } else {
      elmen.classList.remove("d-none");
    }
  }
}

function updateStateSectionView(elm,cla,state) {
  var uporinsert = viewConfigList.filter( (e) => { 
      return (e.key===elm && e.name===cla)
    });
  if(uporinsert[0]||false) {
    updateSectionClass(uporinsert[0].id,elm,cla,state);
  } else {
    setSectionClass(elm,cla,state);
  }
}

function createIDs() {    
  var uID = parseInt(new Date()*1);
  var audioName = "testNew_"+uID;
  return [uID,audioName];
}

function uploadAudio(files) {
  // console.dir(files[0]);
  if(files||files[0]||false) {
    if(/mp3/.test(files[0].type)) {
      addAudioToAll(files[0]);
    } else if(/wav/.test(files[0].type)) {
      var fr = new FileReader();
      fr.onload = function(data) {
        var decoder = new WAVDecoder();
        var decoded = decoder.decode(this.result);
        // console.dir(decoded);
        mp3ncode(decoded.channels,function(tmp3){
          __log("Store new upload");
          addAudioToAll(tmp3);
        });
      }
      fr.readAsBinaryString(files[0]);      
    }
  }
}

function addAudioToAll(file) {
  var tmpID = createIDs();
  // var bURL = URL.createObjectURL(file);
  storeAudio(tmpID[0], file, tmpID[1], -1, '');
  addToOutList([{ uID: tmpID[0], bURL: file, name: tmpID[1], lPos: -1, kPlay: '' }])
}

function dispatcher(tagname,updateobj,options) {
  var tag = document.querySelector(tagname)._tag;
  // if(!tag) return;
  // console.log("the tag "+tag);
  for(var u in updateobj) {
    tag[u] = updateobj[u];
  }
  if(options.update||false) tag.update();
}

function addToOutList(data) {
  for(var d in data) {
    var hit = false;
    for(var a in audioList) {
      if(data[d].uID===audioList[a].uID) {
        audioList[a] = data[d];
        hit = true;
        break;
      }
    }
    if(!hit) {
      data[d].bURL = URL.createObjectURL(data[d].bURL);
      if(data[d].lPos===-1) data[d].lPos =  audioList.length;
      audioList.push(data[d]);
    }
  }
  dispatcher("recordings",{testlist:orderByKey(audioList,"lPos")},{update:true});
  dispatcher("numberboard",{audioList:orderByKey(audioList,"lPos")},{update:true});
}

function orderByKey(list,key) {
  return list.sort(function(a,b) { return a[key] - b[key]; });
}

function clearList(list) {
  var moNo = -1;
  var nList = [];
  for(var l in list) {
    if(list[l]||false) {
      nList.push(list[l]);
    }
  }
  return nList;
}

// crazy hack to maybe keep on track with console error throw by 3rdParty lib
// crossing finger to never need it in real life

// function doSomeWith(msg) {
//   if(msg.indexOf("bad WAV")!=-1) {
//     alert("alarm "+msg);
//   }
// }

// (function(){
//     var oldLog = console.log;
//     console.log = function (message) {
//         doSomeWith(message);
//         oldLog.apply(console, arguments);
//     };
// })();