<recordings>
  <ul>
    <li each={ line, index in testlist }>{ index }, { line }
      <button class="btn btn-danger">{ line }</button>
    </li>
  </ul>

  <script>
    this.testlist = OUTLIST;
  </script>
</recordings>