(function($){
    var debug = false;

    var alpha = 9 * Math.PI / 12;
    var mx = Math.cos(alpha);
    var my = Math.sin(alpha);

    var ridges = [1.0, 1.1, 0.9, 0.9, 1.0, 1.2, 0.8, 1.1, 0.9, 1.2, 1.1, 1.0];
    var ridgeAngle = 2 * Math.PI / ridges.length;

    var Top = $.Top = function(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.update({ fighters: [], asteroids: [], bullets: [] });
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
        this.context.translate(0, this.canvas.height);
        this.context.scale(1, -1);
        this.drawFighters(state.fighters);
        this.drawAsteroids(state.asteroids);
        this.drawBullets(state.bullets);
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
            translate(fighter.x, fighter.y);
            rotate(fighter.orientation);
            beginPath();
            moveTo(fighter.radius, 0);
            lineTo(fighter.radius * mx, fighter.radius * my);
            lineTo(0, 0);
            lineTo(fighter.radius * mx, -fighter.radius * my);
            closePath();
            stroke();
            if (debug) {
                beginPath();
                arc(0, 0, fighter.radius, 0, 2 * Math.PI);
                closePath();
                stroke();
            }
            this.context.restore();
        }
    }
    Top.prototype.drawAsteroids = function(asteroids){
        asteroids.forEach(function(asteroid){
            this.drawAsteroid(asteroid);
        }.bind(this));
    }
    Top.prototype.drawAsteroid = function(asteroid){
        with(this.context) {
            save();
            strokeStyle = 'white';
            fillStyle = 'white';
            translate(asteroid.x, asteroid.y);
            rotate(asteroid.orientation);
            beginPath();
            moveTo(asteroid.radius * ridges[0], 0);
            for (var index = 1; index < ridges.length; index++) {
                var r = asteroid.radius * ridges[index];
                lineTo(
                    r * Math.cos(index * ridgeAngle),
                    r * Math.sin(index * ridgeAngle)
                );
            }
            closePath();
            stroke();
            if (debug) {
                beginPath();
                arc(0, 0, asteroid.radius, 0, 2 * Math.PI);
                closePath();
                stroke();
            }
            this.context.restore();
        }
    }
    Top.prototype.drawBullets = function(bullets){
        bullets.forEach(function(bullet){
            this.drawBullet(bullet);
        }.bind(this));
    }
    Top.prototype.drawBullet = function(bullet){
        with(this.context) {
            save();
            strokeStyle = 'white';
            fillStyle = 'white';
            translate(bullet.x, bullet.y);
            beginPath();
            arc(0, 0, bullet.radius, 0, 2 * Math.PI);
			fill();
            closePath();
            this.context.restore();
        }
    }
})(window || module.exports);
