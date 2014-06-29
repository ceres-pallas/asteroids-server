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

var Game = require('asteroids-game');
var Asteroids = require('asteroids-asteroid');
var Fighter = require('asteroids-fighter');
var Controller = require('asteroids-controller');

var scenario = path.join(__dirname, 'scenarios', process.argv[2] || 'intro');

var options = require(scenario);
var game = new Game(options);
var fighter = new Fighter();
game.addFighter(fighter);
var intializeGame = function(){
	options.fighterInitializer(fighter);
	for (var index = 0; index < options.asteroidCount; index++) {
		game.addAsteroid();
	}
}
intializeGame();
var context = {};
var controller = new Controller();

var viewers = {};
['compile error', 'runtime error', 'compiled'].forEach(function(event){
	controller.addListener(event, function(){
		for (var id in viewers) {
			viewers[id].emit(event, {});
		}
	});
});

io.sockets.on('connection', function(socket){
    console.log('socket %s connected', socket.id);

    socket.on('viewer', function(){
    console.log('socket %s is a viewer', socket.id);
        viewers[socket.id] = socket;
        socket.emit('instructions', options.mission.instructions)
    });

	socket.on('code-change', function(data){
	console.log(data);
		controller.update(data.code);
	});

    socket.on('disconnect', function(){
    console.log('socket %s left the game', socket.id);
        delete viewers[socket.id];
    });
});

var time = 0;
setInterval(function(){
    game.tick();
    var state = game.state();
	controller.control(fighter, context, time++, fighter.state(), state.asteroids);
    for (var id in viewers) {
        viewers[id].emit('game-state', state)
    }
	if (options.repeating && state.asteroids.length === 0) {
		intializeGame();
	}
}, 1000/60);
