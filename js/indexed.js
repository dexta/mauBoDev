//
// Define your database
//
var debugA;
var db = new Dexie("audio_database");
// thats it safari you are no longer supported
db.version(1).stores({
    audioStore: 'uID,bUrl,name,lPos,kPlay',
    sectionClass: '++id,key,name,value'
});
db.open();

function getAllAudio() {
  db.audioStore.toArray(function(data) {
    // console.dir(data);
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
  db.audioStore.put({ uID: uID, bURL: bURL, name: name, lPos: lPos, kPlay: kPlay }).then (function(){
    return db.audioStore.get(uID);
  }).then(function (datas) {
    console.log("New entry to DB name: " + datas.name);
  }).catch(function(error) {
   alert ("Ooops: " + error);
  });
}

function getSectionClasses() {
  db.sectionClass.toArray( (data) => {
    // console.dir(data);
    setSectionView(data);
  });
}

getSectionClasses();

function setSectionClass(key,name,value) {
  db.sectionClass.put({key:key,name:name,value:value}).then( () => {
    return db.sectionClass.get(key);
  }).then( (data)=> {
    // console.log("New entry to DB key,name ",data.key,data.name);
  }).catch( (err) => {
    console.log("set Section error "+err);
    // alert(" Error: "+err);
  });
}

function updateSectionClass(id,key,name,value) {
  db.sectionClass.update(id,{key:key,name:name,value:value});
}