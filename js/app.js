/* Thanks http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
//Get query string
const base_url = "http://localhost:3000/"

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

     this.state = {
       days: {}, 
       config: qs,
       map_markers: [{'lat': 0, 'lng': 0}],
     };
  }
  // Use public class fields syntax to get over the this binding problem
  showSingleAddress = (address) => {
    console.log(this)
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + maps_embed_api_key)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.results.length === 0) {
          alert('Can\'t find ' + address);
        } else {
          console.log(this)
          this.setState({
            map_markers: [resp.results[0].geometry.location]
          })
        }
      });
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
        return resp.json()
      }, function(err){
        alert("Fail to load: " + err)
      })
      .then(function(days){
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
      <div className="page">
        <Days days={this.state.days} config={this.state.config} showSingleAddress={this.showSingleAddress}/>
        <DynamicMap markers={this.state.map_markers}/>
        <Toolbar />
      </div>
    )
  }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
