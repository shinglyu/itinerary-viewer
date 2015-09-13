var AutoLinkText = React.createClass({
  render: function(){
    var re = /(http[s]?:\/\/[^\s]*)/g; 
    if (typeof this.props.data == "undefined"){
      return <div/>
    }
    var text_blocks = this.props.data.split(" ")
    var texts = text_blocks.map(function(text){
      if (text.match(re)){
        return <a href={text} target="_blank">{text}</a>
      }
      else {
        return text + " "
      }
    })

    return (
      <span>{texts}</span>
    )
  }
});

var DayTimeline = React.createClass({
  render: function(){
    var rawnodes = [{title: this.props.date, type:"D"}]
    rawnodes = rawnodes.concat(this.props.nodes)

    nodes = rawnodes.map(function(node, index, array){
      var line = <div className="line"/>
      if (index == array.length -1){
        line = undefined;
      }
      var mapsrc = undefined;
      if (typeof node.address !== "undefined"){
        var mapsrc="http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURI(node.address) + 
        "&size=200x200" + 
        "&markers=size:small|color:red|label:A|" + encodeURI(node.address)
        "&key=AIzaSyBGagqiIEihpnzPp_2xYPImM8jDryx9tlU";
        //var mapsrc="http://placehold.it/200x200";
      }

      //var descriptions = "foo " + <a href="https://google.com">google</a> + " bar"
      //FIXME: move this if else to node type componenet
      return (
        <div className="node">
          <NodeIcon type={node.type}/>
          <div className="content">
            {line}
            <h3 className="title">{node.title}</h3>&nbsp;&nbsp;&nbsp;
            <h3 className="time">{node.time}</h3>
            <div className="map">
              <img src={mapsrc}/>
            </div>
              <div className="text">
                <p className="address">{node.address}</p>
                <p className="description"><AutoLinkText data={node.description}/></p>
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

    if (typeof this.props.type == "undefined") {
      var nodetype = "S";
    }
    else {
      var nodetype = this.props.type[0];
    }

    switch (nodetype){
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
    return (<div className={"icon " + "icon-" + this.props.type}><i className={"fa fa-2x " + icon_name}/></div>)
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

    return (
      <div className="container">
      {days}
      </div>
    )
  }
});

