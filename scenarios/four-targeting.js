var width = 720;
var height = 720;
var initializedAsteroids = 0;

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
	fighter.position({ 'x': width/2, 'y': 100 });
        fighter.radius(10);
        fighter.velocity({ 'speed': 0, 'heading': Math.PI/2 });
        fighter.orientation(Math.PI/2);
    },
    asteroidInitializer: function(asteroid){

	asteroid.position({ 'x': initializedAsteroids?width/6:width*5/6, 'y': 0.8*height });
        asteroid.radius(10);
        asteroid.velocity({ 'speed': 0, 'heading': Math.round(Math.random())*Math.PI, 'omega': Math.PI/100 });
	initializedAsteroids++;
    },
    asteroidCount: 2,
    mission: {
        'instructions': 'the asteroids are sitting ducks, make a targeting alg.: let the fighter target the asteroids one by one. Shooting them is optional. Correction, shooting them is mandatory.'
    }
}
