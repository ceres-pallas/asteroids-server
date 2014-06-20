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

var Game = require('asteroids-game');
var Asteroids = require('asteroids-asteroid');

var options = require('./options');
var game = new Game(options);
game.addFighter(new Asteroids());
for (var index = 0; index < options.asteroidCount; index++) {
    game.addAsteroid();
}

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

setInterval(function(){
    console.log('tick');
    game.tick();
    var state = game.state();
    for (var id in viewers) {
	viewers[id].emit('game-state', state)
    }
}, 1000);
