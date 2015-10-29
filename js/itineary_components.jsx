if (typeof require !== "undefined"){
  var React = require('react')
}
//https://www.google.com.tw/maps/dir/University+of+Taipei,+Zhongzheng+District,+Taipei+City,+Taiwan/%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BF%A1%E7%BE%A9%E5%8D%80%E8%87%BA%E5%8C%97101%E8%B3%BC%E7%89%A9%E4%B8%AD%E5%BF%83/@25.0321477,121.5204559,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x3442a9a02f53dd45:0x38f05d6edd6d3845!2m2!1d121.5138046!2d25.0366038!1m5!1m1!1s0x3442abb6da80a7ad:0xacc4d11dc963103c!2m2!1d121.56481!2d25.033718
var AutoLinkText = React.createClass({
  render: function(){
    var re = /(http[s]?:\/\/[^\s]*)/g; 
    if (typeof this.props.data == "undefined"){
      return <div/>
    }
    var lines = this.props.data.split("\n")
    console.log(lines)
    lines_w_brs = []
    for (var id in lines){
      //console.log(line)
      lines_w_brs.push(lines[id]);
      lines_w_brs.push(<br/>);
    }
    
    var text_blocks = lines_w_brs;
    //var text_blocks = this.props.data.split(" ")
    console.log(this.props.data)
    console.log(text_blocks)
    var texts = text_blocks.map(function(text){
      if (typeof text == "string"){
        if (text.match(re)){
          return <a href={text} target="_blank">{text}</a>
        }
        else {
          return text + " "
        }
      }
      else {
        return text
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
      //var nodetype = this.props.type[0];
      var nodetype = this.props.type;
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
      case "SG-route":
        icon_name += "map-signs"
        break;
      default:
        icon_name += "info"
        break;
    }
    return (<div className={"icon " + "icon-" + this.props.type}><i className={"fa " + icon_name}/></div>)
  }
});

var Map = React.createClass({
  render: function(){
    var address = undefined;

    var map_img_src="http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURI(address) + 
    "&size=200x200" + 
    "&markers=size:small|color:red|label:A|" + encodeURI(address)
    "&key=AIzaSyBGagqiIEihpnzPp_2xYPImM8jDryx9tlU";
    //var map_img_src="http://placehold.it/200x200";
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
      //if (typeof qs['no_map'] == "undefined"){
        if (typeof node.address !== "undefined" && (node.type == "S" || typeof node.type == "undefined")){
          address = node.address;
          map_img_src += "&markers=size:small|color:red|label:A|" + encodeURI(address)  
        }
        else {
          //if (typeof node.title !== "undefined" && typeof qs['no_auto_map'] == "undefined" && (node.type == "S" || typeof node.type == "undefined")){
          //TODO:disable auto infer
          if (typeof node.title !== "undefined"){
            address = node.title;
            map_img_src += "&markers=size:small|color:red|label:A|" + encodeURI(address)  
          }
        }
      //}
    })

    //var map_img_src="http://placehold.it/200x200";
    return (
      <div className="daymap" onClick={this.handleClick}>
        <img src={map_img_src}/>
      </div>
    )
  }
})

var Suggestions = React.createClass({
  render: function(){
    var suggestions = []
    //console.log("Address")
    //console.log(this.props.node.address)
    if (this.props.node.type == "S" && typeof this.props.node.address !== "undefined"){
      suggestions.push(<li><a target="_blank" href={"https://maps.google.com/maps?q=" + encodeURI(this.props.node.address)}>Open map</a></li>)
    }

    if (typeof this.props.node.address == "undefined" || this.props.node.address == this.props.node.title){
      suggestions.push(<li><a target="_blank" href={"https://www.google.com/search?q=" + encodeURI(this.props.node.title) + "+address"}>Find address</a></li>)
      //console.log(suggestions)
    }
    if (typeof this.props.node.description == "undefined" || this.props.node.description == ""){
      suggestions.push(<li><a target="_blank" href={"https://www.google.com/search?q=" + encodeURI(this.props.node.title)}>Find detail</a></li>)
      //console.log(suggestions)
    }
    return (
      <div className="suggestions">
        <ul>
          {suggestions}
        </ul>
      </div>
    )
  }

})

var Node = React.createClass({
  render: function(){
    //console.log("config:")
    //console.log(this.props.config)
    var node = this.props.node;
    //console.log(node)
    var line;
    if (this.props.drawVertLine){
      line = <div className="line"/>;
    }
    //console.log(node.description)
    var desc = <AutoLinkText data={node.description}/>
    //console.log(desc)
    var sg_route_class="";
    if (node.type == "SG-route"){
      return (
        <div className="node suggestions" >
          <NodeIcon type={node.type}/>
          {line}
          <div className="content">
            <h4 className="title"><a href={node.description} target="_blank">Find route</a></h4>
          </div>
        </div>
      );
    }

    var suggestions;
    if (typeof this.props.config['planningMode'] !== "undefined"){
      suggestions = (<Suggestions node={node}/>)
    }
    var map = <Map node={node}/>
    var map = {};
    var time = {};
    if (typeof node.time !== "undefined" && node.time !== ""){
        time = <p className="time"><i className="fa fa-clock-o"/>{node.time}</p>
    }

    var address = {};
    if (node.address !== node.title){
      address = <p className="address"><i className="fa fa-map-marker"/>{node.address}</p>
    }

    var titleNode = <h4 className="title">{node.title}</h4>
    if (node.type == "T"){
      titleNode = <p className="title">{node.title}</p> 
    }
    return (
      <div className={"node " + sg_route_class + " " + this.props.node.type} >
        <NodeIcon type={node.type}/>
        {line}
        <div className="content">
          {titleNode}
          {map}
          <div className="text">
            {time}
            {address}
            <p className="description">{desc}</p>
            {suggestions}
          </div>
        </div>
      </div>
    );
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
  inferAddress: function(nodes){
    return nodes.map(function(node){
      if (node['type'] !== "S"){
        return node;
      }
      if (typeof node['address'] == "undefined"){
        node['address'] = node['title'];
        return node
      }
    })
  },
  insertTransitSuggestions: function(nodes){
    for (var idx =0; idx < nodes.length-1; idx++){
      if (nodes[idx]['type'] == "S" && nodes[idx+1]['type'] == "S"){
        nodes.splice(idx+1, 0, {
          "type": "SG-route",
          "title":"Find route",
          "address":"Find route",
          "description":"http://maps.google.com/maps?saddr=" + encodeURI(nodes[idx]['address']) + "&daddr=" + encodeURI(nodes[idx+1]['address']) + "&dirflg=r"
        })
      }
    }
    return nodes;
  },
  render: function(){
    var rawnodes = [{title: this.props.date, type:"D"}]
    rawnodes = rawnodes.concat(this.props.nodes)

    //console.log(rawnodes)
    var nodes = this.fillEmptyTypes(rawnodes);
    //console.log(nodes)
    if(typeof this.props.config['planningMode'] !== "undefined" && this.props.config['planningMode'][0] == "1"){ //BUG: python server will be "1/"
      nodes = this.insertTransitSuggestions(nodes);
    }
    console.log(nodes)
    //console.log(this)
    var config = this.props.config;
    //console.log(config)
    nodes = nodes.map(function(node, index, array){
      return (
        //<Node node={node} drawVertLine={(index != array.length-1)}  />
        <Node node={node} config={config} drawVertLine={(index != array.length-1)}  />
      )
    }) 
    return (
      <div className="timeline">
        {nodes}
      </div>
    );
  }
});

var Days= React.createClass({
  render: function(){
    //console.log(this.props.config)
    days = []
    for (var date in this.props.days){
      days.push(
        <div>
          <Day nodes={this.props.days[date]} date={date} config={this.props.config}/>
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
module.exports.Node = Node;
module.exports.Suggestions = Suggestions;
