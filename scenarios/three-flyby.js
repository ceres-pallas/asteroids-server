var width = 720;
var height = 720;

module.exports = {
	repeating: false,
    width: width,
    height: height,
    bullet: {
        radius: 2,
        speed: 8,
        ttl: 80
    },
    fighterInitializer: function(fighter){
	fighter.position({ 'x': width/6, 'y': 100 });
        fighter.radius(10);
        fighter.velocity({ 'speed': 0, 'heading': Math.PI/2 });
        fighter.orientation(Math.PI/2);
		fighter.omega(0);
    },
    asteroidInitializer: function(asteroid){
        console.log(asteroid);
	asteroid.position({ 'x': Math.random()*width, 'y': 0.5*height + Math.random()*0.5*height });
        asteroid.radius(10);
        asteroid.velocity({ 'speed': 0.5+Math.random(), 'heading': Math.round(Math.random())*Math.PI, 'omega': Math.PI/100 });
    },
    asteroidCount: 5,
    mission: {
        'instructions': 'The asteroids move at semi-random speed to the left or to the right. Try shooting them and be efficient about it! Bullets dont come cheap!'
    }
}
