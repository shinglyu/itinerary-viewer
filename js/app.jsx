/* Thanks http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
//Get query string
const base_url = "http://localhost:3000/"
var Page = React.createClass({
  getInitialState: function(){
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


     
     return {days:{"Please select a plan file":[]}, config:qs}
  },
  componentDidMount: function(){
    //var base_url = "http://localhost:3000/"
    var file = this.state.config['file'];

    fetch(base_url + file)
      .then(function(resp){
        console.log(resp)
        return resp.json()
      })
      .then(function(days){
        
        console.log("from server")
        console.log(days)
        try {
          this.setState({"days": days})
        }
        catch (e) {
          console.error(e)
          
        }
      }.bind(this))
  },
  save: function(days) {
    this.setState({"days": days});

    console.log("save")
    console.log(days)
    var request =  new Request(base_url + this.state.config['file'], {
      method: 'PUT', 
      body: JSON.stringify(days)
    });
    fetch(request)
      .then(function(resp){
        if (resp.status == 200) {
          console.log("Saved")
        }
        else {
          alert('Saving failed, please check the console for the error')
          // TODO: get the body as text and print it out
        }
      });
  },
  render: function(){
    
    return (
      <div>
        <Days days={this.state.days} config={this.state.config} save={this.save}/>
        <Toolbar />
      </div>
    )
  }
})

React.render(<Page/>, document.body);

