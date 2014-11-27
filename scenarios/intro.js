var width = 720;
var height = 720;

module.exports = {
	repeating: true,
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
        asteroid.position({ 'x': width/2, 'y': height - 150 });
        asteroid.radius(100);
        asteroid.velocity({ 'speed': 0, 'heading': 0, 'omega': Math.PI/100 });
    },
    asteroidCount: 1,
    mission: {
        'instructions': 'Shoot the looming asteroid before it can do any harm.'
    }
}
