(function(io, Vision){
   var socket = io.connect(window.location.origin);

    socket.emit('viewer', {});

    var vision = new Vision(document.getElementById('vision'));
    var top = new Top(document.getElementById('top'));
	var mission = new Mission(document.getElementById('mission'));

    socket.on('game-state', function(data) {
        vision.update(data);
        top.update(data);
    });
})(io, Vision);
