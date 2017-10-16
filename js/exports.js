var debugMp = {};
var tasks = [];

function convertToMp3(idList,loglist) {
  
  db.audioStore.toArray(function(data){
    for(var a in data) {
      // console.log("from store "+data[a].name);
      loglist.push(data[a].name+" convet start");
      tasks.push(false);
      fromBlobToArrayBuffer(data[a],loglist);
    }

  });
}

function fromArrayBufferToMp3(buffer,data,loglist) {
  var encoder = new Mp3LameEncoder(44100, 192);
  
  encoder.encode([buffer,buffer]);
  var keyName = data.name;
  var enfin = encoder.finish("audio/mp3");
  debugMp[keyName] = enfin;
  console.dir(enfin);
  loglist.push("finish encode "+keyName);
  var last = tasks.indexOf(false);
  if(last!=-1) {
    tasks[last] = true;
    if(tasks.indexOf(false)===-1) everythinkToZip();;
  }
  console.dir(tasks.toString());
  // console.log("end encode "+keyName);
}


function fromArrayToLameMp3(buffer,data,logfile) {
  var mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128);
  var mp3Data = [];

  var samples = buffer;
  var sampleBlockSize = 1152;

  var mp3Data = [];
  for (var i = 0; i < samples.length; i += sampleBlockSize) {
    sampleChunk = samples.subarray(i, i + sampleBlockSize);
    var mp3buf = mp3encoder.encodeBuffer(sampleChunk);
    if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
    }
  }
  var mp3buf = mp3encoder.flush();   //finish writing mp3

  if (mp3buf.length > 0) {
      mp3Data.push(new Int8Array(mp3buf));
  }

  var keyName = data.name;
  debugMp[keyName] = mp3Data;
  var last = tasks.indexOf(false);
  if(last!=-1) {
    tasks[last] = true;
    if(tasks.indexOf(false)===-1) everythinkToZip();;
  }
  console.dir(tasks.toString());
}


function fromBlobToArrayBuffer(data,loglist) {
  var fileReader = new FileReader();
  var arrayBufferNew = null;
  fileReader.onload = function() {
    arrayBufferNew = this.result;
    console.dir(arrayBufferNew);
    samples  = new Float32Array(arrayBufferNew);

    fromArrayBufferToMp3(samples,data,loglist);
    // fromArrayToLameMp3(samples,data,loglist);
  }
  // console.log("data bURL "+data.bURL);
  fileReader.readAsArrayBuffer(data.bURL);
}

function everythinkToZip() {
  var zip = new JSZip();
  console.log("zip started ");
  var fol = zip.folder("mp3export1-n");

  for(var dm in debugMp) {
    fol.file(dm+".mp3", debugMp[dm], {base64: false});
    console.log("zip add file "+dm);
  }

  zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
  });
}