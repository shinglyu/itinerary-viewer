/* Thanks http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
//Get query string
const base_url = "http://localhost:3000/"
//var Page = React.createClass({
class Page extends React.Component {
  constructor(props){
    super(props);
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

     this.state = {days:{}, config:qs};
  }
  componentDidMount(){
    //var base_url = "http://localhost:3000/"
    var file = this.state.config['file'];

    fetch(base_url + file)
      .then(function(resp){
        if (!resp.ok) {
          alert("Fail to find the itinerary file, please check the URL again.");
          return;
        }
        console.log(resp)
        return resp.json()
      }, function(err){
        alert("Fail to load: " + err)
      })
      .then(function(days){
          //console.log(text)
          console.log(days)
          try {
            this.setState({"days": days})
          }
          catch (e) {
            console.error(e)
            
          }
        }.bind(this),
        function(err) {
          alert("Error while loading json: " + err)
        }
      )
  }
  render(){
    
    return (
      <div>
        <Days days={this.state.days} config={this.state.config}/>
        <Toolbar />
      </div>
    )
  }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
