var debugMp = {};
var tasks = [];

function mp3ncode(buffer,callback) {
  var encoder = new Mp3LameEncoder(44100, 128);
  encoder.encode(buffer);
  var fmp3 = encoder.finish("audio/mp3");
  callback(fmp3);
  // saveAs(fmp3,"testEncode.mp3");
}

function makeZipFile(data,name) {
  var zip = new JSZip();
  console.log("zip started ");
  var fol = zip.folder("mp3xport");
  for(var dm in data) {
    var name = data[dm].name;
    var blob = data[dm].bURL;
    fol.file(name+".mp3", blob, {base64: false});
    console.log("zip add file "+name);
  }  
  zip.generateAsync({type:"blob"}).then(function(content) {
  // see FileSaver.js
  saveAs(content, name);
  });
}

function everythinkToZip() {
  db.audioStore.toArray(function(data) {
    makeZipFile(data,"testExample_"+new Date()*1+"_.zip");    
  });
}