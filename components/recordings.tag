<recordings>
  <div each={ line, index in testlist }>
    <div if={lineNoEdit!=index}>
      <button class="btn btn-danger" onclick={ editLine(index) }><i class="fa fa-pencil" aria-hidden="true"></i></button>
      <button class="btn btn-info">{ line.lPos }</button>
      <button class="btn btn-warning"><i class="fa fa-bullhorn" aria-hidden="true"></i></button>
      <label>{ line.name }</label>
      <audio src="{ line.src }" controls></audio>
      
    </div>
    <div if={lineNoEdit===index}>
      <hr />
      <button class="btn btn-warning" onclick={ editLine(index) }><i class="fa fa-pencil" aria-hidden="true"></i></button>
      <button class="btn btn-info">{ line.lPos }</button>
      <button class="btn btn-default" onclick={ listUp() }>
        <i class="fa fa-chevron-up" aria-hidden="true"></i>
      </button>
      <button class="btn btn-default" onclick={ listDown() }>
        <i class="fa fa-chevron-down" aria-hidden="true"></i>
      </button>
      <button class="btn btn-danger" onclick={ setHorn() }>
        <i class="fa fa-bullhorn" aria-hidden="true"></i>
      </button>
      <input value={line.name} ref="newNameInput" />
      <button class="btn btn-danger" onclick={saveName()}>Save</button>
      <hr />

    </div>
  </div>

<!-- Script  -->
  <script>
    var that = this;
    this.testlist = [];
    this.lineNoEdit = -1;

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
      if(this.lineNoEdit===-1 || (dir==="up" && index===0) || (dir==="down" && index===this.testlist.length-1) ) return;
      var newIndex = (dir==="down")? index + 1 : index -1; 
      console.log("dir index "+dir,index,newIndex);
      var source = -1;
      var target = -1;
      for(var l in this.testlist) {
        if(this.testlist[l].lPos===newIndex) target = l;
        if(this.testlist[l].lPos===index) source = l;
      }
      this.testlist[target].lPos = index;
      this.testlist[source].lPos = newIndex;
      this.lineNoEdit = newIndex;
      console.log("dir index "+dir,index,newIndex);
      orderByKey(this.testlist,"lPos");
    }

    this.listUp = function() {
      return () => {
        that.moveInList("up",that.lineNoEdit);
      }
    }
    this.listDown = function() {
      return () => {
        that.moveInList("down",that.lineNoEdit);
      }
    }

    this.setHorn = function() {
      
    }


    window.addEventListener("keyup",function(e) { 
      console.log("key: "+e.key+" | code: "+e.keyCode);
    });

  </script>
</recordings>