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
      //console.log(text)
      //console.log(this)
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
        <Days days={this.state.days} />
      </div>
    )
  }
})

React.render(<Page/>, document.body);

