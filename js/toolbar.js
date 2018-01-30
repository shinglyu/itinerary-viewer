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
  render(){
    return (
      <div className="toolbar">
        <button onClick={this.togglePlanningMode}>Planning Mode</button>
      </div>
    )
  }
}

