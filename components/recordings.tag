<recordings>
  <div class="row" each={ line, index in testlist }>
    <!-- <div> -->
      <hr if={lineNoEdit===index}>
      <!-- <button class="btn btn-danger" onclick={ editLine(index) }><i class="fa fa-pencil" aria-hidden="true"></i></button> -->
     <div class="col-lg-2 col-sm-3 col-6">
      <button class="btn btn-info">{ line.lPos }</button>
      <button class="btn btn-success" onclick={ playIt(line.uID) }>
        <i class="fa fa-play" aria-hidden="true"></i>
      </button>
      <button class="btn btn-warning pull-right hidden-md-down" onclick={ setHorn(index) }>
        <i if={line.kPlay==""} class="fa fa-bullhorn" aria-hidden="true"></i>{ upperKey(index) }
      </button>
     </div>
     <div class="col-lg-2 col-sm-3 col-6">
      <button class="btn btn-default" onclick={ listUp(index) }>
        <i class="fa fa-chevron-up" aria-hidden="true"></i>
      </button>
      <button class="btn btn-default" onclick={ listDown(index) }>
        <i class="fa fa-chevron-down" aria-hidden="true"></i>
      </button>
     </div>
     <div class="col-lg-4 col-sm-6 col-12">
      <label if={lineNoEdit!=index} onclick={ editLine(index) }>{ line.name }</label>
      <div if={lineNoEdit===index} class="input-group">
        <button class="btn btn-danger" onclick={ deleteLine(index) }> <i class="fa fa-trash" aria-hidden="true"></i> </button>
        <input value={line.name} ref="newNameInput" class="form-control" placeholder="a short name" />
        <button class="btn btn-success" onclick={saveName()}>Save</button>
      </div>
      
     </div>

     <div class="col-lg-4 col-md-12 hidden-sm-down">
      <audio src="{ line.bURL }" id="{ line.uID }" controls></audio>
     </div>
      <hr if={lineNoEdit===index}>
      
    <!-- </div> -->
<!--     <div if={lineNoEdit===index}>
      <hr />
      <button class="btn btn-warning" onclick={ editLine(index) }><i class="fa fa-pencil" aria-hidden="true"></i></button>
      <button class="btn btn-info">{ line.lPos }</button>

      <button class="btn btn-danger" onclick={ setHorn() }>
        <i class="fa fa-bullhorn" aria-hidden="true"></i>
      </button>
      <input value={line.name} ref="newNameInput" />
      <button class="btn btn-danger" onclick={saveName()}>Save</button>
      <hr />
    </div> -->
  </div>

<!-- Script  -->
  <script>
    var that = this;
    this.testlist = [];
    this.lineNoEdit = -1;
    this.keyListen = -1;

    // getAllAudio();
    console.dir(this.testlist);

    this.editLine = function(clickObj) {
      return () => {
        if(clickObj===that.lineNoEdit) {
          that.lineNoEdit = -1;
        } else {
          that.lineNoEdit = clickObj;
          // console.dir(that.testlist);
        }
      }
    };

    this.saveName = function() {
      return () => {
        console.log("new Name: "+that.refs.newNameInput.value);
        newName = that.refs.newNameInput.value;
        updateAudio(that.testlist[that.lineNoEdit].uID,{name:newName});
        that.testlist[that.lineNoEdit].name = newName;
        that.lineNoEdit = -1;
      }
    };

    this.deleteLine = function(index) {
      return () => {
        deleteAudio(that.testlist[index].uID);
        delete that.testlist[index];
        that.testlist = clearList(that.testlist);
        that.lineNoEdit = -1;
        console.dir(that.testlist);
      }
    };

    this.moveInList = function(dir,index) {
      
      var sPos = this.testlist[index].lPos;
      if((dir==="up" && sPos===0) || (dir==="down" && sPos===this.testlist.length-1) ) return;
      this.lineNoEdit = -1;
      var tPos = (dir==="down")? sPos + 1 : sPos -1;
      var chObj = this.testlist.find(o => o.lPos === tPos);
      if(chObj||false) {
        updateAudio(chObj.uID,{lPos:sPos});
        chObj.lPos = sPos;
      }
      
      // for(var l in this.testlist) {
      //   if(this.testlist[l].lPos===tPos) {
      //     this.testlist[l].lPos = sPos;
      //     updateAudio(this.testlist[l].uID,{lPos:sPos});
      //     break;
      //   }
      // }
      updateAudio(this.testlist[index].uID,{lPos:tPos});
      this.testlist[index].lPos = tPos;
      this.testlist = orderByKey(this.testlist,"lPos");
      // updateAudio( orderByKey(this.testlist,"lPos") );

      // console.dir(this.testlist);
      // getAllAudio();
      // if(uIndex!=-1) {
      //   updateAudio(this.testlist[uIndex].id,this.testlist[uIndex]);
      // }
      // updateAudio(this.testlist[index].id,this.testlist[index]);


      // console.log("dir index "+dir,index,newIndex);
      // var source = -1;
      // var target = -1;
      // for(var l in this.testlist) {
      //   if(this.testlist[l].lPos===newIndex) {
      //   }
      //   if(this.testlist[l].lPos===newIndex) target = l;
      //   if(this.testlist[l].lPos===index) source = l;
      // }
      // var upIn = updateAudio(this.testlist[target].id,{lPos:index});
      // var upNi = updateAudio(this.testlist[newIndex].id,{lPos:newIndex});

      // this.testlist[target].lPos = index;
      // this.testlist[source].lPos = newIndex;
      
      // console.log("index newIndex "+this.testlist[target].id,this.testlist[newIndex].id);
      // this.lineNoEdit = newIndex;
      // console.log("dir index "+dir,index,newIndex);

      
    }

    this.listUp = function(index) {
      return () => {
        that.moveInList("up",index);
      }
    }
    this.listDown = function(index) {
      return () => {
        that.moveInList("down",index);
      }
    }

    this.upperKey = function(index) {
      if(that.testlist[index].kPlay!="") {
        return String.fromCharCode(that.testlist[index].kPlay);
      }
      return "";
    }

    this.setHorn = function(index) {
      return () => {
        console.log("setHorn index "+index);
        that.keyListen = index;
      }
    }

    this.recordKey = function(keyCode) {
      if(keyCode===27) { 
        this.lineNoEdit = -1;
        this.update();
      } else if(this.keyListen!=-1) {
        this.testlist[this.keyListen].kPlay = keyCode;
        updateAudio(this.testlist[this.keyListen].uID,{kPlay:keyCode});
        this.keyListen=-1;
        this.update();
      } else {
        var didWe = this.testlist.find(d => d.kPlay === keyCode);
        if(didWe||false) {
          document.getElementById(didWe.uID).play()
        }
      }
      return;
    }

    this.playIt = function(uID) {
      return () => {
        console.log(uID);
        document.getElementById(uID).play();
      }
    }

    window.addEventListener("keyup",function(e) { 
      console.log("key: "+e.key+" | code: "+e.keyCode);
      that.recordKey(e.keyCode);
    });

  </script>

  <style>
  </style>
</recordings>