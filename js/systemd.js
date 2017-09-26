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
  console.log("uid "+uID);
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