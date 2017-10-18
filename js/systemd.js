function playFromList(num) {
  if(audioList[num]||false) {
    audioList[num].play();
  } else { return 0}
}

function createIDs() {    
  var uID = parseInt(new Date()*1);
  var audioName = "testNew_"+uID;
  return [uID,audioName];
}

function uploadAudio(files) {
  console.dir(files[0]);

  var fr = new FileReader();
  fr.onload = function(data) {
    // console.dir(data);
    // console.dir(this.result);
    var decoder = new WAVDecoder();
    var decoded = decoder.decode(this.result);
    console.dir(decoded);
    // console.dir(xeleve(this.result));
    justEncode(decoded.channels);
  }
  fr.readAsBinaryString(files[0]);
  // fr.readAsArrayBuffer(files[0]);

  // addAudioToAll(files[0]);
  // var tmpID = createIDs();
  // storeAudio(files[0],tmpID[0],tmpID[1]);
  // createAudioElm(files[0],tmpID[0],tmpID[1]);
}

function xeleve(buffer) {
  var nBuffR = new Float32Array(buffer.length/2);
  var nBuffL = new Float32Array(buffer.length/2);
  var count = 0;
  for(var b=0;b<=buffer.length;b+=2) {
    count++;
    nBuffL.push(buffer[b]); 
    nBuffR.push(buffer[b+1]); 
  }
  console.log("the count "+count);
  return [nBuffR,nBuffL];
}



// function createAudioElm(file,uID,name) {
//   // console.log("uid "+uID);
//   var au = document.createElement('audio');
//   au.controls = true;
//   au.src = URL.createObjectURL(file);
//   au.setAttribute("id", "audio_"+uID);

//   var li = document.createElement('div');
//   li.className = "row";
//   li.setAttribute("id", "container_"+uID);

//   var auW = document.createElement('div');
//   auW.className = 'col-lg-9';
//   audioList.push(au);
//   audioMap[uID] = au;
//   auW.appendChild(au);
  
//   var btnString = '<div class="col-lg-3"><button class="btn btn-success pull-left" onclick="selectAudio('+uID+')">PRESS</button></div>';
//   li.innerHTML = btnString;

//   li.appendChild(auW);
//   recordingslist.appendChild(li);
//   var stringID = "TEST01"+uID+"";
  
// }

function addAudioToAll(file) {
  var tmpID = createIDs();
  // var bURL = URL.createObjectURL(file);
  storeAudio(tmpID[0], file, tmpID[1], -1, '');
  addToOutList([{ uID: tmpID[0], bURL: file, name: tmpID[1], lPos: -1, kPlay: '' }])
}


function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    
    addAudioToAll(blob);
    // 
    // createAudioElm(blob,tmpID[0],tmpID[1]);
  });
}

// function selectAudio(uID) {
//   console.log("select audio "+uID+" and hotnumber "+hotNumber);
//   if(hotNumber!=-1) {
//     audioList[hotNumber] = audioMap[uID];
//   } else {
//     console.log("no hot number uID"+uID);
//   }
// }

// var OUTLIST = [
//   // {src:"http://localhost:8000/wav/test1.wav",name:"test1" ,uID:"12345678901"},
//   // {src:"http://localhost:8000/wav/test2.wav",name:"test2" ,uID:"12345678902"},
//   // {src:"http://localhost:8000/wav/test3.wav",name:"test3" ,uID:"12345678903"},
// ];


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
    // console.log("d and a "+d,a);
  }
  // console.dir(orderByKey(audioList,"lPos"));
  dispatcher("recordings",{testlist:orderByKey(audioList,"lPos")},{update:true});
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

function doSomeWith(msg) {
  if(msg.indexOf("WAV")) {
    console.dir("alarm "+msg);
  }
}

(function(){
    var oldLog = console.log;
    console.log = function (message) {
        doSomeWith(message);
        oldLog.apply(console, arguments);
    };
})();