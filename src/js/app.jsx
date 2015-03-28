var DayTimeline = React.createClass({
  render: function(){
    nodes = this.props.nodes.map(function(node){
      return (
        <li>
          <div className="icon"><img src="pic/icon.png"/></div>
          <div className="content">
            <h3 className="time">{node.node.time}</h3>
            <h2 className="title">{node.node.title}</h2>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <p className="address">{node.node.address}</p>
            <p className="description">{node.node.description}</p>
          </div>
        </li>
      )
    });
    return (
      <ul className="timeline">
        {nodes}
      </ul>
    );
  }
});

nodes = [
  {
  'type':'sight',
  'node':{
    'title':'Bar',
    'time':'2015/3/31',
    'address': '1st street, NY',
    'description': 'foo bar',
    }
  },
  {
  'type':'sight',
  'node':{
    'title':'Bar',
    'time':'2015/3/31',
    'address': '1st street, NY',
    'description': 'foo bar',
    }
  },
]; //TODO:read and parse file
React.render(<DayTimeline nodes={nodes}/>, document.body);
