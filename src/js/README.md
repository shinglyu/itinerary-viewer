Use jison to compile the parser

* npm install -g jison
* jison localparser.jison
* Include the generated localparser.js in html
* This will introduce a global object `parser.parse()`
