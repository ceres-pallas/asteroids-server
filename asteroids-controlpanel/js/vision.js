(function($){
    var Vision = $.Vision = function(canvas){
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.update();
    };

    Vision.prototype.update = function(state) {
	this.drawBackground();
    }
    Vision.prototype.drawBackground = function() {
	this.context.save();
	this.context.fillStyle = 'black';
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.restore();
    }
})(window || module.exports);
