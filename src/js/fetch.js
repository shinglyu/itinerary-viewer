/* Fetch the source file */

var r = new XMLHttpRequest(); 
r.open("GET", "plan.txt", true); //FIXME: hardcoded file name
r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return; 
      
      console.log(r.responseText)
      days= parser.parse(r.responseText); //Depends on parser and app.jsx
      console.log(days)
};
r.send();
