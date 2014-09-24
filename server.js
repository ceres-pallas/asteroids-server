var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3435);
app.use('/controlpanel', express.static(__dirname + '/asteroids-controlpanel'));
app.get('/', function(request, response){
	response.redirect('/controlpanel/');
});

server.listen(app.get('port'));
console.log('Asteroids server started listening on port ' + app.get('port'));

var ServerState = require('./lib/server-state');
var state = new ServerState(process.argv[2] || 'intro');
state.initialize();

io.sockets.on('connection', function(socket){
	console.log('socket %s connected', socket.id);

	socket.on('viewer', function(){
		console.log('socket %s is a viewer', socket.id);
		state.addViewer(socket);
	});

	socket.on('code-change', function(data){
		console.log(data);
		state.update(data);
	});

	socket.on('disconnect', function(){
		console.log('socket %s left the game', socket.id);
		state.removeViewer(socket);
	});
});

setInterval(state.tick.bind(state), 1000/60);
