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
       map_markers: [{'lat': 52.3792, 'lng': 4.8994}], // Amsterdam
     };
  }
  // Use public class fields syntax to get over the this binding problem
  showSingleAddress = async (address) => {
    let geocoder = new CachedGeoCoder();
    let location = await geocoder.geocode(address);
    
    if (location === null) {
      alert("Can't find " + address);
    } else {
      this.setState({
        map_markers: [location]
      });
    }
  }

  // Use public class fields syntax to get over the this binding problem
  showMultipleAddresses = async (addresses) => {
    let geocoder = new CachedGeoCoder();
    let locations = await geocoder.geocodeMultiple(addresses);
    
    let valid_locations = locations.filter((x) => x !== null)
    if (locations.every((x) => x === null)) {
      alert("Can't find all the addresses" + address);
    // TODO: show a non-blocking warning if some of the addresses failes to decode
    } else {
      this.setState({
        map_markers: valid_locations
      })
    }
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
        <Days days={this.state.days} config={this.state.config} showSingleAddress={this.showSingleAddress} showMultipleAddresses={this.showMultipleAddresses}/>
        <DynamicMap markers={this.state.map_markers}/>
        <Toolbar />
      </div>
    )
  }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
