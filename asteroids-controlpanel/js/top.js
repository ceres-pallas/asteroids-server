(function($){
    var debug = true;

    var alpha = 9 * Math.PI / 12;
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
	with(this.context) {
	    save();
	    strokeStyle = 'white';
	    fillStyle = 'white';
	    rotate(Math.PI/2 + fighter.orientation);
	    beginPath();
	    moveTo(fighter.radius, 0);
	    lineTo(fighter.radius * mx, fighter.radius * my);
	    lineTo(0, 0);
	    lineTo(fighter.radius * mx, -fighter.radius * my);
	    closePath();
	    stroke();
	    if (debug) {
		beginPath();
		arc(fighter.x, fighter.y, fighter.radius, 0, 2 * Math.PI);
		closePath();
		stroke();
	    }
	    this.context.restore();
	}
    }
})(window || module.exports);
