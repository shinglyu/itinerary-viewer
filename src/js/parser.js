var parser = {
  parseLine: function(line) {
    var line_re = new RegExp(/([SHTF]:)(.*)/g);
    if ((m = line_re.exec(line)) !== null) {
      fields = m[2].split(";").map(function(str){return str.trim()})
      return (
        {
        'type': m[1],
        'title': fields[0],
        'time': fields[1],
        'address': fields[2],
        'description': fields[3]
        }
      )
    }
    else {
      return ({"type": "NOTE", "title": line.trim()});
    }
    //return line;

  },
  parseDay: function(day) {
    var lines = day.split('\n').map(function(str){return str.trim()}).filter(function(line) {return line !== ""})
    console.log(this.parseLine)
    return lines.map(this.parseLine, this)
  },
  parse: function(txt) {
    var days = txt.split('-----').map(function(str){return str.trim()})
    console.log(this.parseDay)
    return days.map(this.parseDay, this)
  },
}


