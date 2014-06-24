var width = 720;
var height = 720;

module.exports = {
    width: width,
    height: height,
    fighterInitializer: function(fighter){
	fighter.position({ 'x': 50, 'y': 100 });
	fighter.radius(10);
	fighter.velocity({ 'speed': '0.5', 'heading': Math.PI/12 });
	fighter.orientation(Math.PI/12);
    },
    asteroidInitializer: function(asteroid){
	asteroid.position({ 'x': width * Math.random(), 'y': height * Math.random() });
	asteroid.velocity({ 'speed': '5', 'heading': 2*Math.PI * Math.random() });
	asteroid.radius(30);
    },
    asteroidCount: 10
}
