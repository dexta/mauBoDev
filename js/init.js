function __log(e, data) {
    log.innerHTML += "\n" + e + " " + (data || '');
  }

var audio_context;
var recorder;
var audioList = [];
var audioMap = {};
// var hotNumber = -1;
// var programmNumber = false;


function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  __log('Media stream created.');

  // Uncomment if you want the audio to feedback directly
  //input.connect(audio_context.destination);
  //__log('Input connected to audio context destination.');
  
  recorder = new Recorder(input);
  __log('Recorder initialised.');
}

function startRecording(button) {
  recorder && recorder.record();
  button.disabled = true;
  button.nextElementSibling.disabled = false;
  __log('Recording...');
}

// function old_stopRecording(button) {
//   recorder && recorder.stop();
//   button.disabled = true;
//   button.previousElementSibling.disabled = false;
//   __log('Stopped recording.');
  
//   // create WAV download link using audio data blob
//   createDownloadLink();
  
//   recorder.clear();
// }

function stopRecording(button) {
  recorder && recorder.stop();
  button.disabled = true;
  button.previousElementSibling.disabled = false;
  __log('Stopped recording.');
  
  recorder && recorder.exportPCM(function(bufferArray) {
    __log('Start encoding....');  
    // console.dir(bufferArray);
    mp3ncode(bufferArray,function(tmp3){
      __log("Stop encodeing !");
      addAudioToAll(tmp3);
      console.dir(tmp3);  
    });
    
  });
  recorder.clear();
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    
    audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    __log('No live audio input: ' + e);
  });

};