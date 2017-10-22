<exporting>
<form class="form-inline">
  <div class="input-group">
    <div class="input-group-btn {showExSelect}">
      <button onclick={ toggleExSelect() } type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        { exportType }
      </button>
      <div class="dropdown-menu">
        <a onclick={ exportAs('Number') } class="dropdown-item" href="#">Number</a>
        <a onclick={ exportAs('Name') } class="dropdown-item" href="#">Name</a>
      </div>
    </div>
    <input value={ exportFilename } ref="newExportFilename" type="text" class="form-control" aria-label="Text input with dropdown button">
  </div>

  <button class="btn btn-info" onclick={ startExport }>Start Export</button>

</from>

  <script>
    that = this;
    this.exportType = "Number";
    this.exportFilename = "bundle.zip";
    this.showExSelect = "";
    this.toggleExSelect = () => {
      return () => {
        that.showExSelect = (that.showExSelect==="show")? "" : "show";
      }
    };

    this.exportAs = (type) => {
      return (e) => {
        that.showExSelect = "";
        that.exportType = type;
      }
    };

    this.startExport = () => {
      console.log(that.exportType,that.refs.newExportFilename.value);
      var options = {no: true};
      if(that.exportType!="Number") options.no = false;
      everythinkToZip(that.refs.newExportFilename.value,options);
    };
    

  </script>

</exporting>