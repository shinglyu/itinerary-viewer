var pegjs = '\
days = day+ \
day = $(!"-----" .)* "-----"\
'
var parser = PEG.buildParser(pegjs)
var result = parser.parse('abc\n-----\nbce\n-----\nsefe')
console.log(result)
