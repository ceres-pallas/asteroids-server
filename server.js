var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3435);
app.use('/start', express.static(__dirname + '/landing'));
app.use('/control', express.static(__dirname + '/control'));
app.use('/view', express.static(__dirname + '/view'));
app.get('/', function(request, response){
    response.redirect('/start/');
});

var viewers = {};

io.sockets.on('connection', function(socket){
    console.log('socket %s connected', socket.id);

    socket.on('viewer', function(){
	console.log('socket %s is a viewer', socket.id);
	viewers[socket.id] = socket;
    })

    socket.on('disconnect', function(){
	console.log('socket %s left the game', socket.id);
	delete viewers[socket.id];
    });
});

server.listen(app.get('port'));
console.log('Asteroids server started listening on port ' + app.get('port'));
