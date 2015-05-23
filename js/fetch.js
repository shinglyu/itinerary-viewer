/* Fetch the source file */

var days
var r = new XMLHttpRequest(); 
r.open("GET", "http://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn&destination=Queens&sensor=false&departure_time=1343605500&mode=transit", true); //FIXME: hardcoded file name
r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return; 
      
      console.log(r.responseText)
};
r.send();
