//
// Define your database
//
var debugA;
var db = new Dexie("audio_database");
db.version(1).stores({
    audioStore: 'uID,bUrl,name,lPos,kPlay'
});
db.open();


// collection.each(function(datas) {
//     console.log('Found: Name ' + datas.name + ' with uID ' + datas.uID);
//     // createAudioElm(datas.data,datas.uID,datas.name);
    
// });
function getAllAudio() {
  // var collection = db.audioStore.where('uID').startsWithIgnoreCase('15');
  // var collection = db.audioStore.where('uID').above('1');
  db.audioStore.toArray(function(data) {
    console.dir(data);
    addToOutList(data);
    
  });  
}

getAllAudio();

function updateAudio(uID,upObj) {
  db.audioStore.update(uID,upObj);
}

function deleteAudio(uID) {
  db.audioStore.delete(uID);
}

function storeAudio(uID, bURL, name, lPos, kPlay) {
  // Put some data into it
  //
  console.log("store Audio "+uID,name);
  db.audioStore.put({ uID: uID, bURL: bURL, name: name, lPos: lPos, kPlay: kPlay }).then (function(){
      //
      // Then when data is stored, read from it
      //
      return db.audioStore.get(uID);
  }).then(function (datas) {
      //
      // Display the result
      //
      console.log("New entry to DB name: " + datas.name);
  }).catch(function(error) {
     //
     // Finally don't forget to catch any error
     // that could have happened anywhere in the
     // code blocks above.
     //
     alert ("Ooops: " + error);
  });
}