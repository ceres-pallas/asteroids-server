var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3435);

server.listen(app.get('port'));
console.log('Asteroids server started listening on port ' + app.get('port'));
