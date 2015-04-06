var DayTimeline = React.createClass({
  render: function(){
    nodes = this.props.nodes.map(function(node){
      return (
        <li>
          <NodeIcon type={node.type[0]}/>
          <div className="content">
            <h3 className="time">{node.time}</h3>
            <h2 className="title">{node.title}</h2>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <p className="address">{node.address}</p>
            <p className="description">{node.description}</p>
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

var NodeIcon = React.createClass({
  render: function(){
    return (<div className="icon"><img src={"pic/icon-" + this.props.type + ".png"} /></div>)
  }
});

var DayTimelines = React.createClass({
  render: function(){
    days = this.props.days.map(function(day){return(<DayTimeline nodes={day}/>)});
    return (
      <div>
      {days}
      </div>
    )
  }
});
/*
nodes = [
      { type: 'T:', title: '捷運凹仔底 => 紅32/紅33/168 => 美術館'  },
      { type: 'S:', title: '美術館'  },
      { type: 'T:', title: '捷運西子灣'  },
      { type: 'F:', title: '哈瑪星廟口正老牌汕頭麵'  },
      { type: 'S:', title: '英國領事館, 中山大學'  },
      { type: 'S:', title: '駁二特區, 真愛碼頭, 光榮碼頭 '  },
      { type: 'T:', title: '捷運鹽埕埔 or 中央公園'  },
      { type: 'S:', title: '三多商圈/中央公園/85 大樓'  }, 
]; //TODO:read and parse file
*/



//React.render(<DayTimeline nodes={nodes}/>, document.body);
React.render(<DayTimelines days={days}/>, document.body);

