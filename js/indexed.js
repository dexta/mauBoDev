//
// Define your database
//
var debugA;
var db = new Dexie("audio_database");
db.version(1).stores({
    audioStore: 'uID,name,data'
});
db.open();
var collection = db.audioStore.where('name').startsWithIgnoreCase('t');

collection.each(function(datas) {
    console.log('Found: Name ' + datas.name + ' with uID ' + datas.uID);
    createAudioElm(datas.data,datas.uID,datas.name);
});

function storeAudio(audioFile,uID,name) {
  //files[0],tmpID[1],tmpID[0]
  // Put some data into it
  //
  debugA = audioFile;
  db.audioStore.put({name: name, uID: uID,data: audioFile}).then (function(){
      //
      // Then when data is stored, read from it
      //
      return db.audioStore.get(uID);
  }).then(function (datas) {
      //
      // Display the result
      //
      console.log("sort name is " + datas.name);
  }).catch(function(error) {
     //
     // Finally don't forget to catch any error
     // that could have happened anywhere in the
     // code blocks above.
     //
     alert ("Ooops: " + error);
  });
}