var debugMp = {};
var tasks = [];

function mp3ncode(buffer,callback) {
  __log("start encoding");
  var encoder = new Mp3LameEncoder(44100, 128);
  encoder.encode(buffer);
  var fmp3 = encoder.finish("audio/mp3");
  __log("stop encoding");
  callback(fmp3);
  // saveAs(fmp3,"testEncode.mp3");
}

function makeZipFile(data,filename,options) {
  __log("prepare zip archive "+filename);
  var zip = new JSZip();
  var fol = zip.folder("mp3xport");
  __log("add folder mp3Export");
  for(var dm in data) {
    var blob = data[dm].bURL;
    var mpid = (options.no)? data[dm].lPos : data[dm].name;
    fol.file(mpid+".mp3", blob, {base64: false});
    __log("add file "+mpid+".mp3");
  }  
  zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    __log("start download ...");
    saveAs(content, filename);
  });
}

function everythinkToZip(filename,options) {
  db.audioStore.toArray(function(data) {
    makeZipFile(data,filename,options);
  });
}