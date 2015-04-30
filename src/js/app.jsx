var DayTimeline = React.createClass({
  render: function(){
    nodes = this.props.nodes.map(function(node, index, array){
      var line = <div className="line"/>
      if (index == array.length -1){
        line = undefined;
      }
      //var mapsrc="http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURI(node.address) + "zoom=13&size=600x300&key=AIzaSyBGagqiIEihpnzPp_2xYPImM8jDryx9tlU"/>
      var mapsrc = undefined;
      if (typeof node.address !== "undefined"){
        /*
        var mapsrc="http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURI(node.address) + 
        "&size=200x200" + 
        "&markers=size:small|color:red|label:A|" + encodeURI(node.address)
        "&key=AIzaSyBGagqiIEihpnzPp_2xYPImM8jDryx9tlU";
        */
        var mapsrc="http://placehold.it/200x200";
      }
      return (
        <div className="node">
          <NodeIcon type={node.type[0]}/>
          <div className="content">
            {line}
            <h3 className="title">{node.title}</h3>&nbsp;&nbsp;&nbsp;
            <h3 className="time">{node.time}</h3>
            <div className="map">
              <img src={mapsrc}/>
            </div>
              <div className="text">
                <p className="address">{node.address}</p>
                <p className="description">{node.description}</p>
              </div>
          </div>
        </div>
      )
    });
    return (
      <div className="timeline">
        {nodes}
      </div>
    );
  }
});

var NodeIcon = React.createClass({
  render: function(){
    var icon_name="fa-"
    console.log(this.props.type)
    switch (this.props.type){
      case "S":
        icon_name += "street-view"
        break;
      case "T":
        icon_name += "subway"
        break;
      case "F":
        icon_name += "cutlery"
        break;
      case "N":
        icon_name += "info"
        break;
      default:
        icon_name += "info"
        break;
    }
    //return (<div className="icon"><img src={"pic/icon-" + this.props.type + ".png"} /></div>)
    return (<div className="icon"><i className={"fa fa-2x " + icon_name}/></div>)
  }
});

var DayTimelines = React.createClass({
  render: function(){
    console.log(this.props.days)
    console.log(this.props.days.map)
    days = this.props.days.map(function(day){return(
      <div>
      <DayTimeline nodes={day}/>
      <hr/>
      </div>
    )});
    return (
      <div className="container">
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

