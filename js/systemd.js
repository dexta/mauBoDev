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
  var tmpID = createIDs();
  storeAudio(files[0],tmpID[0],tmpID[1]);
  createAudioElm(files[0],tmpID[0],tmpID[1]);
}

function createAudioElm(file,uID,name) {
  // console.log("uid "+uID);
  var au = document.createElement('audio');
  au.controls = true;
  au.src = URL.createObjectURL(file);
  au.setAttribute("id", "audio_"+uID);

  var li = document.createElement('div');
  li.className = "row";
  li.setAttribute("id", "container_"+uID);

  var auW = document.createElement('div');
  auW.className = 'col-lg-9';
  audioList.push(au);
  audioMap[uID] = au;
  auW.appendChild(au);
  
  var btnString = '<div class="col-lg-3"><button class="btn btn-success pull-left" onclick="selectAudio('+uID+')">PRESS</button></div>';
  li.innerHTML = btnString;

  li.appendChild(auW);
  recordingslist.appendChild(li);
  var stringID = "TEST01"+uID+"";
  
}

function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    var tmpID = createIDs();
    storeAudio(blob,tmpID[0],tmpID[1]);
    createAudioElm(blob,tmpID[0],tmpID[1]);
  });
}

function selectAudio(uID) {
  console.log("select audio "+uID+" and hotnumber "+hotNumber);
  if(hotNumber!=-1) {
    audioList[hotNumber] = audioMap[uID];
  } else {
    console.log("no hot number uID"+uID);
  }
}

var OUTLIST = [
  // {src:"http://localhost:8000/wav/test1.wav",name:"test1" ,uID:"12345678901"},
  // {src:"http://localhost:8000/wav/test2.wav",name:"test2" ,uID:"12345678902"},
  // {src:"http://localhost:8000/wav/test3.wav",name:"test3" ,uID:"12345678903"},
];


function dispatcher(tagname,updateobj,options) {
  var tag = document.querySelector(tagname)._tag;
  for(var u in updateobj) {
    tag[u] = updateobj[u];
  }
  if(options.update||false) tag.update();
}

function addToOutList(dataIndexed) {
  var outA = [];
  for(var i in dataIndexed) {
    var src = URL.createObjectURL(dataIndexed[i].data);
    outA.push({
      id:i,
      src:src,
      name:dataIndexed[i].name,
      uID:dataIndexed[i].uID,
      lPos:parseInt(i),
      kPlay:dataIndexed[i].kPlay
    });  
  }

  dispatcher("recordings",{testlist:orderByKey(outA,"lPos")},{update:true});
}

function orderByKey(list,key) {
  return list.sort(function(a,b) { return a[key] - b[key]; });
}