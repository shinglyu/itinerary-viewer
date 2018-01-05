/* Fetch the source file */

var days
var r = new XMLHttpRequest(); 
r.open("GET", "http://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn&destination=Queens&sensor=false&departure_time=1343605500&mode=transit", true); //FIXME: hardcoded file name
r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return; 
      
      //console.log(r.responseText)
      var YAML = window.YAML
      try {
        days = YAML.parse(r.responseText); //Depends on parser and app.jsx
      } catch (e) {
        var msg = e.rawMessage + "\n line " + e.parsedLine + "\n " + e.snippet
        alert(msg)
        //console.error(msg)
      }
};
r.send();
