var Toolbar = React.createClass({
  enablePlanningMode: function(){
    window.location.href = window.location.href + "&planningMode=1"
  },
  render: function(){
    return (
      <div className="toolbar">
        <button onClick={this.enablePlanningMode}>Planning Mode</button>
      </div>
    )
  }
});

window.export.Toolbar = Toolbar;
