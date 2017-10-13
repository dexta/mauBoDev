<recordings>
  <div each={ line, index in testlist }>
    <div>
      <!-- <button class="btn btn-danger" onclick={ editLine(index) }><i class="fa fa-pencil" aria-hidden="true"></i></button> -->
      <button class="btn btn-info">{ line.lPos }</button>
      <button class="btn btn-warning"><i class="fa fa-bullhorn" aria-hidden="true"></i></button>
      <button class="btn btn-default" onclick={ listUp(index) }>
        <i class="fa fa-chevron-up" aria-hidden="true"></i>
      </button>
      <button class="btn btn-default" onclick={ listDown(index) }>
        <i class="fa fa-chevron-down" aria-hidden="true"></i>
      </button>
      <label if={lineNoEdit!=index} onclick={ editLine(index) }>{ line.name }</label>
      <input if={lineNoEdit===index} value={line.name} ref="newNameInput" />
      <button if={lineNoEdit===index} class="btn btn-danger" onclick={saveName()}>Save</button>
      <audio if={lineNoEdit!=index} src="{ line.bURL }" controls></audio>
      
    </div>
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

    getAllAudio();

    this.editLine = function(clickObj) {
      return () => {
        if(clickObj===that.lineNoEdit) {
          that.lineNoEdit = -1;
        } else {
          that.lineNoEdit = clickObj;
          console.dir(that.testlist);
        }
      }
    };

    this.saveName = function() {
      return () => {
        console.log("new Name: "+that.refs.newNameInput.value);
      }
    };

    this.moveInList = function(dir,index) {
      console.log("dir index "+dir,index);
      var sPos = this.testlist[index].lPos;
      if((dir==="up" && sPos===0) || (dir==="down" && sPos===this.testlist.length-1) ) return;
      var tPos = (dir==="down")? sPos + 1 : sPos -1;
      updateAudio(this.testlist[index].uID,{lPos:tPos});
      this.testlist[index].lPos = tPos;
      for(var l in this.testlist) {
        if(this.testlist[l].lPos===tPos) {
          this.testlist[l].lPos = sPos;
          this.lineNoEdit = -1;
          updateAudio(this.testlist[l].uID,{lPos:sPos});
          break;
        }
      }
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

    this.setHorn = function() {

    }


    window.addEventListener("keyup",function(e) { 
      console.log("key: "+e.key+" | code: "+e.keyCode);
    });

  </script>
</recordings>