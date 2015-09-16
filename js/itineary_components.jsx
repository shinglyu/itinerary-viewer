var React = require('react')
//https://www.google.com.tw/maps/dir/University+of+Taipei,+Zhongzheng+District,+Taipei+City,+Taiwan/%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BF%A1%E7%BE%A9%E5%8D%80%E8%87%BA%E5%8C%97101%E8%B3%BC%E7%89%A9%E4%B8%AD%E5%BF%83/@25.0321477,121.5204559,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x3442a9a02f53dd45:0x38f05d6edd6d3845!2m2!1d121.5138046!2d25.0366038!1m5!1m1!1s0x3442abb6da80a7ad:0xacc4d11dc963103c!2m2!1d121.56481!2d25.033718
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

var Map = React.createClass({
  render: function(){
    var address = undefined;
    console.log(qs)
    if (typeof qs['no_map'] == "undefined"){
      if (typeof this.props.node.address !== "undefined"){
        address = this.props.node.address;
        console.log("Used address " + address)
       }
      else {
        if (typeof this.props.node.title !== "undefined" && typeof qs['no_auto_map'] == "undefined"){
          address = this.props.node.title;
          console.log("Used title" + address)
        }
      }

    }
    var map_img_src="http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURI(address) + 
    "&size=200x200" + 
    "&markers=size:small|color:red|label:A|" + encodeURI(address)
    "&key=AIzaSyBGagqiIEihpnzPp_2xYPImM8jDryx9tlU";
    //var mapsrc="http://placehold.it/200x200";
    var external_link ="http://maps.google.com/maps?q=" + encodeURI(address);

    if ((this.props.node.type != "S" && typeof this.props.node.type !== "undefined") || typeof address == "undefined"){
      return <div/>
    }
    else {
      return (
        <div className="map">
          <a href={external_link} target="_blank">
            <img src={map_img_src}/>
          </a>
        </div>
      )
    }
  }
})

var DayMap = React.createClass({
  getInitialState: function(){
    return {"size": "300x300"};
  },

  handleClick: function(){
    // FIXME: what't the upper limit?
    this.setState({"size": "1200x1200"});
  },

  render: function(){
    //FIXME: ES6

    var map_img_src="https://maps.googleapis.com/maps/api/staticmap?" + 
    "&size=" + this.state['size']
    "&key=AIzaSyBGagqiIEihpnzPp_2xYPImM8jDryx9tlU";
    //var mapsrc="http://placehold.it/200x200";
    //
    this.props.nodes.map(function(node){
      if (typeof qs['no_map'] == "undefined"){
        if (typeof node.address !== "undefined" && (node.type == "S" || typeof node.type == "undefined")){
          address = node.address;
          map_img_src += "&markers=size:small|color:red|label:A|" + encodeURI(address)  
        }
        else {
          if (typeof node.title !== "undefined" && typeof qs['no_auto_map'] == "undefined" && (node.type == "S" || typeof node.type == "undefined")){
            address = node.title;
            map_img_src += "&markers=size:small|color:red|label:A|" + encodeURI(address)  
          }
        }
      }
    })

    return (
      <div className="daymap" onClick={this.handleClick}>
        <img src={map_img_src}/>
      </div>
    )
  }
})

var Day = React.createClass({
  fillEmptyTypes: function(nodes){
    return nodes.map(function(node){ 
      if (typeof node['type'] == "undefined") {
        node['type'] = "S";
      }
      if (typeof node['address'] == "undefined") {
        node['address'] = node['title'];
      }
      return node
    });
  },
  insertTransitSuggestions: function(nodes){
    for (var idx =0; idx < nodes.length-1; idx++){
      if (nodes[idx]['type'] == "S" && nodes[idx+1]['type'] == "S"){
        nodes.splice(idx+1, 0, {
          "type": "T",
          "title":"Find route",
          "description":"http://maps.google.com/maps?saddr=" + encodeURI(nodes[idx]['address']) + "&daddr=" + encodeURI(nodes[idx+1]['address']) + "&dirflg=r"
        })
      }
    }
    return nodes;
  },
  render: function(){
    var rawnodes = [{title: this.props.date, type:"D"}]
    rawnodes = rawnodes.concat(this.props.nodes)

    console.log(rawnodes)
    var nodes = this.fillEmptyTypes(rawnodes);
    console.log(nodes)
    var nodes = this.insertTransitSuggestions(nodes);
    console.log(nodes)
    nodes = nodes.map(function(node, index, array){
      var line = <div className="line"/>
      if (index == array.length -1){
        line = undefined;
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
            <Map node={node}/>
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

var Days= React.createClass({
  render: function(){
    days = []
    for (var date in this.props.days){
      days.push(
        <div>
          <Day nodes={this.props.days[date]} date={date}/>
          <DayMap nodes={this.props.days[date]}/>
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

module.exports.Day = Day;
module.exports.NodeIcon = NodeIcon;
