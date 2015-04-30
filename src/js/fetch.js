/* Fetch the source file */

var r = new XMLHttpRequest(); 
//r.open("GET", "plan.txt", true); //FIXME: hardcoded file name
//r.open("GET", "201506Whistler.txt", true); //FIXME: hardcoded file name
r.open("GET", "201506Whistler.yaml", true); //FIXME: hardcoded file name
//r.open("GET", "test.txt", true); //FIXME: hardcoded file name
r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return; 
      
      console.log(r.responseText)
      //days = parser.parse(r.responseText); //Depends on parser and app.jsx
      var YAML = window.YAML
      try {
        days = YAML.parse(r.responseText); //Depends on parser and app.jsx
      } catch (e) {
        var msg = e.rawMessage + "\n line " + e.parsedLine + "\n " + e.snippet
        alert(msg)
        console.error(msg)
        /* handle error */
      }
};
r.send();
