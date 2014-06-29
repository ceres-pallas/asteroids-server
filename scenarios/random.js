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
        fighter.position({ 'x': 50, 'y': 100 });
        fighter.radius(10);
        fighter.velocity({ 'speed': '0.5', 'heading': Math.PI/12 });
        fighter.orientation(Math.PI/12);
		fighter.omega(0);
    },
    asteroidInitializer: function(asteroid){
        asteroid.position({ 'x': width * Math.random(), 'y': height * Math.random() });
        asteroid.radius(12 + 6 * Math.random());
        asteroid.velocity({ 'speed': '3', 'heading': 2*Math.PI * Math.random(), omega: Math.PI/100 * (1 + 2 * Math.random()) });
    },
    asteroidCount: 10,
    mission: {
        'instructions': 'Have fun!'
    }
}
