var Toolbar = React.createClass({
  enablePlanningMode: function(){
    window.location.href = window.location.href + "&planningMode=1"
  },
  selectRemoteFile: function(evt){
    //XXX: hardcoded source_files path; input file can only get filename for security reasons
    window.location.href = window.location.href.split('?')[0] + "?file=" + "source_files/" + evt.target.value
  },
  render: function(){
    return (
      <div className="toolbar">
        <label for="remotefile">Select file</label>
        <input type='file' id="remotefile" onChange={this.selectRemoteFile} />
        <button onClick={this.enablePlanningMode}>Planning Mode</button>
      </div>
    )
  }
});

window.export.Toolbar = Toolbar;
