(function(io){
   var socket = io.connect(window.location.origin);

    socket.emit('viewer', {});

    socket.on('game-state', function(data) {
	console.log(data);
    });
})(io);
