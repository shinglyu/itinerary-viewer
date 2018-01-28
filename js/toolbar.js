class Toolbar extends React.Component {
  togglePlanningMode(){
    if (window.location.href.indexOf("planningMode=1") > 0){
      window.location.href = window.location.href.replace("planningMode=1", "");
    }
    else {
      //console.log(window.location.href.indexOf("?"))
      if (window.location.href.indexOf("\?") > 0){
        window.location.href = window.location.href + "&planningMode=1";
      }
      else {
        window.location.href = window.location.href + "?planningMode=1";
      }
    }
  }
  selectRemoteFile(evt){
    //XXX: hardcoded source_files path; input file can only get filename for security reasons
    window.location.href = window.location.href.split('?')[0] + "?file=" + "source_files/" + evt.target.value
  }
  render(){
    return (
      <div className="toolbar">
        <label htmlFor="remotefile">Select file</label>
        <input type='file' id="remotefile" onChange={this.selectRemoteFile} />
        <button onClick={this.togglePlanningMode}>Planning Mode</button>
      </div>
    )
  }
}

