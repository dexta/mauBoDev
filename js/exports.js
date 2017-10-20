var debugMp = {};
var tasks = [];

function mp3ncode(buffer,callback) {
  var encoder = new Mp3LameEncoder(44100, 128);
  encoder.encode(buffer);
  var fmp3 = encoder.finish("audio/mp3");
  callback(fmp3);
  // saveAs(fmp3,"testEncode.mp3");
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