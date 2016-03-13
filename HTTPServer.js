var connect = require('connect');
var csscc = require('./js/csscc.js');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});

//csscc({}, url)