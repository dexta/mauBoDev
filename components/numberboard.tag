<numberboard>
  <h3 class="text-center">Press a Number</h3>
  <table class="table table-bordered">
    <tr each={ line, index in boardWire }>
      <td each={ btn,index in line }>
        <button class="btn btn-lg btn-default" onclick={ playNum(btn.num) } data-toggle="tooltip" data-placement="top" title="{btn.name}">
          <span> { btn.num } </span>
          <!-- <span if={ !btn.icon }> { btn.num },{ btn.name } </span> -->
          <!-- <span if={ btn.icon }> { btn.num } , <i class="fa fa-{ btn.icon }" aria-hidden="true"></i></span> -->
        </button>
      </td>
    </tr>
  </table>

  <script>
  var that = this;
  this.audioList = [];
  this.keyList = {};
  this.boardWire = [
    [{num:"1",name:"Eins"},{num:"2",name:"Zwei"},{num:"3",name:"drei"}],
    [{num:"4",name:"Vier"},{num:"5",name:"Fuenf"},{num:"6",name:"Sechs"}],
    [{num:"7",name:"Sieben"},{num:"8",name:"Acht"},{num:"9",name:"Neun"}],
    [ {num:"-",name:"minus"},{num:"0",name:"Null"},{num:"+",name:"plus"}]
  ];
  
  this.on('update', function() {
    console.log("numberboard list count "+this.audioList.length);
    for(let x in this.boardWire) {
      for(let y in this.boardWire[x]) {
        let snum = parseInt(this.boardWire[x][y].num);
        let hasName = this.audioList.find( (e) => { return e.lPos==snum});
        if(hasName||false) {
          this.boardWire[x][y].name = hasName.name;
          this.keyList[snum] = hasName.uID;
          // console.dir(hasName);
        }
      }
    }
  });

  registerNewKeyEvent( (code,kchar) => {
    console.log("press code: "+code+" and char: "+kchar);
    if(this.keyList[kchar]||false) {
      document.getElementById(this.keyList[kchar]).play();
    }
  });

  playNum(num) { 
    return function(e) { 
      if(parseInt(num)>=0) {
        if(programmNumber) {
          hotNumber = num;
          programmNumber = false;
        } else {
          hotNumber = -1;
          playFromList(num);
        }
      } else {
        programmNumber = true;
      }
      dispatcher("recordings",{testlist:[1,2,3,4,5]},{update:true});
      console.log("play num "+num); 
    } 
  }
  </script>
</numberboard>