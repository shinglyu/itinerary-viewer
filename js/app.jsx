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

    return (
      <div className="container">
      {days}
      </div>
    )
  }
});

var FileSelector = React.createClass({
  render: function(){
    return (
      <div className="fileSelector">
        <input type="file" id="file" onChange={this.props.loadNewData}/>
        <a href="./example.yaml.txt">Download an example</a>
      </div>
    )
  }
  
})

/* Thanks http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
//Get query string
 var qs = (function(a) {
   if (a == "") return {};
   var b = {};
   for (var i = 0; i < a.length; ++i)
   {
     var p=a[i].split('=', 2);
     if (p.length == 1)
       b[p[0]] = "";
     else
       b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
   }
   return b;
 })(window.location.search.substr(1).split('&'));

var Page = React.createClass({
  getInitialState: function(){
     return {days:{"Please select a plan file":[]}}
  },
  componentDidMount: function(){
    var source = ""
    if (typeof qs['file'] == "undefined"){
      source = "source_files/default.yml";
    }
    else {
      source = qs['file']
    }
    fetch(source)
    .then(function(resp){
      return resp.text()
    })
    .then(function(text){
      console.log(text)
      console.log(this)
      this.setState({"days": window.YAML.parse(text)})
    }.bind(this))
  },
  loadNewData: function(e){
    var reader = new FileReader();
    reader.onload = function(e){
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

React.render(<Page/>, document.body);

