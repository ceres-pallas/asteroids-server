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
        fighter.position({ 'x': width/2, 'y': 100 });
        fighter.radius(10);
        fighter.velocity({ 'speed': 0, 'heading': Math.PI/2 });
        fighter.orientation(Math.PI/2);
		fighter.omega(0);
    },
    asteroidInitializer: function(asteroid){
        asteroid.position({ 'x': 0, 'y': height - 150 });
        asteroid.radius(100);
        asteroid.velocity({ 'speed': 0.5, 'heading': 0, 'omega': Math.PI/100 });
    },
    asteroidCount: 1,
    mission: {
        'instructions': 'It\'s coming right for us! Kill it with fire.'
    }
}
