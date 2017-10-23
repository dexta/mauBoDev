//
// Define your database
//
var debugA;
var db = new Dexie("audio_database");
// thats it safari you are no longer supported
db.version(1).stores({
    audioStore: 'uID,bUrl,name,lPos,kPlay'
});
db.open();

function getAllAudio() {
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
    return db.audioStore.get(uID);
  }).then(function (datas) {
    console.log("New entry to DB name: " + datas.name);
  }).catch(function(error) {
   alert ("Ooops: " + error);
  });
}