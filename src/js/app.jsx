var DayTimeline = React.createClass({
  render: function(){
    var rawnodes = [{title: this.props.date, type:"D"}]
    rawnodes = rawnodes.concat(this.props.nodes)

    nodes = rawnodes.map(function(node, index, array){
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
          <NodeIcon type={node.type[0]/*FIXME*/}/>
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
      case "D":
        icon_name += "calendar"
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
    days = []
    for (var date in this.props.days){
      days.push(
        <div>
          <DayTimeline nodes={this.props.days[date]} date={date}/>
          <hr/>
        </div>
      )
    }
    /*
    days = this.props.days.map(function(day){return(
      <div>
      <DayTimeline nodes={day}/>
      <hr/>
      </div>
    )});
    */

    return (
      <div className="container">
      {days}
      </div>
    )
  }
});

var FileSelector = React.createClass({
  /*
  readFile: function(e){
    var reader = new FileReader();
    reader.onload = function(){
      console.log(this.result)
    }
    reader.readAsText(e.target.files[0])
  },
  */
  render: function(){
    return (
      <div className="fileSelector">
        <input type="file" id="file" onChange={this.props.loadNewData}/>
        <a href="./example.yaml">Download an example</a>
      </div>
    )
  }
  
})

var Page = React.createClass({
  getInitialState: function(){
     return {days:{"Please select a plan file":[]}}
  },
  componentDidMoung: function(){
    
  },
  loadNewData: function(e){
    var reader = new FileReader();
    reader.onload = function(e){
      //console.log(e.target.result)
      this.setState({"days": window.YAML.parse(e.target.result)})
    }.bind(this);
    reader.readAsText(e.target.files[0])
  },
  render: function(){
    return (
      <div>
        <FileSelector loadNewData={this.loadNewData}/>
        <DayTimelines days={this.state.days} />
      </div>
    )
  }
})



//React.render(<DayTimeline nodes={nodes}/>, document.body);
//React.render(<DayTimelines days={days}/>, document.body);
React.render(<Page/>, document.body);

