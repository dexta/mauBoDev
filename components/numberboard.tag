<numberboard>
  <h3 class="text-center">Press a Number</h3>
  <table class="table">
    <tr each={ line, index in boardWire }>
      <td each={ btn,index in line }>
        <button class="btn btn-lg btn-default" onclick={ playNum(btn.num) }>
          <span> { btn.num } </span>
          <!-- <span if={ !btn.icon }> { btn.num },{ btn.name } </span> -->
          <!-- <span if={ btn.icon }> { btn.num } , <i class="fa fa-{ btn.icon }" aria-hidden="true"></i></span> -->
        </button>
      </td>
    </tr>
  </table>

  <script>
  this.boardWire = [
    [{num:"1",name:"Eins"},{num:"2",name:"Zwei"},{num:"3",name:"drei"}],
    [{num:"4",name:"Vier"},{num:"5",name:"Fuenf"},{num:"6",name:"Sechs"}],
    [{num:"7",name:"Sieben"},{num:"8",name:"Acht"},{num:"9",name:"Neun"}],
    [ {num:"*",name:'<i class="fa fa-play" aria-hidden="true"></i>',icon:"play"},
      {num:"0",name:"Null"},
      {num:"#",name:'<i class="fa fa-download" aria-hidden="true"></i>',icon:"download"}]
  ];
  


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