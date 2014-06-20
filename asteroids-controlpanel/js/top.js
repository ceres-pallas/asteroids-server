(function($){
    var debug = true;

    var alpha = 2 * Math.PI / 3;
    var mx = Math.cos(alpha);
    var my = Math.sin(alpha);

    var Top = $.Top = function(canvas){
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.update({ fighters: [], asteroids: [] });
    }
    Top.prototype.update = function(state){
	this.drawBackground();
	this.drawEntities(state);
    }
    Top.prototype.drawBackground = function(){
	this.context.save();
	this.context.fillStyle = 'black';
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.restore();
    }
    Top.prototype.drawEntities = function(state){
	this.context.save();
	this.context.translate(this.canvas.width/2, this.canvas.height/2);
	this.context.scale(1, -1);
	this.drawFighters(state.fighters);
	this.context.restore();
    }
    Top.prototype.drawFighters = function(fighters){
	fighters.forEach(function(fighter){
	    this.drawFighter(fighter);
	}.bind(this));
    }
    Top.prototype.drawFighter = function(fighter){
	this.context.save();
	this.context.strokeStyle = 'white';
	this.context.fillStyle = 'white';
	this.context.rotate(Math.PI/2 + fighter.orientation);
	this.context.beginPath();
	this.context.moveTo(fighter.radius, 0);
	this.context.lineTo(fighter.radius * mx, fighter.radius * my);
	this.context.lineTo(0, 0);
	this.context.lineTo(fighter.radius * mx, -fighter.radius * my);
	this.context.closePath();
	this.context.stroke();
	if (debug) {
	    this.context.beginPath();
	    this.context.arc(fighter.x, fighter.y, fighter.radius, 0, 2 * Math.PI);
	    this.context.closePath();
	    this.context.stroke();
	}
	this.context.restore();
    }
})(window || module.exports);
