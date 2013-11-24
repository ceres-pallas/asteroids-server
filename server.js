var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3435);
app.use('/start', express.static(__dirname + '/landing'));
app.use('/control', express.static(__dirname + '/control'));
app.get('/', function(request, response){
    response.redirect('/start/');
});

server.listen(app.get('port'));
console.log('Asteroids server started listening on port ' + app.get('port'));
