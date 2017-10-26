<numberboard class="row">
  <div class="col-lg-1 col-md-1 col-3" each={ line,index in boardWire }>
    <button class="btn btn-lg btn-default" onclick={ playNum(line.uID) } data-toggle="tooltip" data-placement="top" title="{line.name}">
      { line.num }
    </button>
  </div>

  <script>
  var that = this;
  this.audioList = [];
  this.keyList = {};
  this.boardWire = [];
  
  this.on('update', function() {
    console.log("numberboard list count "+this.audioList.length);
    for(let x in this.audioList) {
      this.boardWire[x] = {};
      if(this.audioList[x].kPlay!="") {
        this.boardWire[x].num = String.fromCharCode(this.audioList[x].kPlay);
      } else {
        this.boardWire[x].num = (this.audioList[x].lPos<=9)? this.audioList[x].lPos : "XX";
      }
      
      this.boardWire[x].uID = this.audioList[x].uID;
      this.boardWire[x].name = this.audioList[x].name;
    }
  });

  registerNewKeyEvent( (code,kchar) => {
    if(this.keyList[kchar]||false) {
      document.getElementById(this.keyList[kchar]).play();
    }
  });

  playNum(uID) { 
    return function(e) { 
      document.getElementById(uID).play();
    }
  }
  </script>
</numberboard>