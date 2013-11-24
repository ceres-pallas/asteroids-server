var width = 640;
var height = 480;

module.exports = {
    width: width,
    height: height,
    asteroidInitializer: function(asteroid){
	asteroid.position({ 'x': width * Math.random(), 'y': height * Math.random() });
	asteroid.velocity({ 'speed': '5', 'heading': 2*Math.PI * Math.random() });
	asteroid.radius(30);
    },
    asteroidCount: 10
}
