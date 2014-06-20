(function(io, Vision){
   var socket = io.connect(window.location.origin);

    socket.emit('viewer', {});

    var vision = new Vision(document.getElementById('vision'));

    socket.on('game-state', function(data) {
	console.log(data);
	vision.update(data);
    });
})(io, Vision);
