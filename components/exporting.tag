<exporting>
  <button class="btn btn-info" onclick={ startExport }>Start Export</button>
  <ul>
    <li each={ line, index in exportLog }> { line } </li>
  </ul>



  <script>
    this.exportLog = ["start log","first entry"];
    this.startExport = () => {
      convertToMp3([],this.exportLog);
    };
    

  </script>

</exporting>