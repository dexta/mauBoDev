<exporting>
  <button class="btn btn-info" onclick={ startExport }>Start Export</button>
  <ul>
    <li each={ line, index in exportLog }> { line } </li>
  </ul>

  <script>
    that = this;
    this.exportLog = ["start log","first entry"];
    this.startExport = () => {
      everythinkToZip("newTest.zip",{no:false});
    };
    

  </script>

</exporting>