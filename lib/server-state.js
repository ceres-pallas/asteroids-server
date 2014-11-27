var path = require('path');

var Game = require('asteroids-game');
var Asteroids = require('asteroids-asteroid');
var Fighter = require('asteroids-fighter');
var Controller = require('asteroids-controller');
var Logger = require('../node_modules/asteroids-controller/lib/logger.js');

var State = module.exports = function(name){
	var scenario = path.join(__dirname, '..', 'scenarios', name || 'intro');
	this.options = require(scenario);
	this.game = new Game(this.options);
	this.fighter = new Fighter();
	this.game.addFighter(this.fighter);
	this.controller = new Controller();
	this.viewers = {};
	['compile error', 'runtime error', 'compiled'].forEach(function(event){
		this.controller.addListener(event, function(){
			for (var id in this.viewers) {
				this.viewers[id].emit(event, {});
			}
		}.bind(this));
	}.bind(this));
	this.time = 0;
	this.context = {};
}

State.prototype.initialize = function(){
	this.options.fighterInitializer(this.fighter);
	for (var index = 0; index < this.options.asteroidCount; index++) {
		this.game.addAsteroid();
	}
	this.time = 0;
	this.context = {};
}

State.prototype.tick = function() {
	this.game.tick();
	var state = this.game.state();
	var logger = new Logger();
	this.controller.control(
		this.fighter,
		logger,
		this.context,
		this.time++,
		this.fighter.state(),
		state.asteroids,
		state.bullets
	);
	for (var id in this.viewers) {
		this.viewers[id].emit('game-state', state);
		logger.lines().forEach(function(line){
			this.viewers[id].emit('log', line);
		}.bind(this));
	}
	if (this.options.repeating && state.asteroids.length === 0) {
		this.initialize();
	}
}

State.prototype.addViewer = function(socket) {
	this.viewers[socket.id] = socket;
	socket.emit('instructions', this.options.mission.instructions);
}

State.prototype.removeViewer = function(socket) {
	delete this.viewers[socket.id];
}

State.prototype.update = function(data) {
	this.controller.update(data.code);
}
