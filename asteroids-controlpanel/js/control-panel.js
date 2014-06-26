(function(io, Vision){
   var socket = io.connect(window.location.origin);

    socket.emit('viewer', {});

    var vision = new Vision(document.getElementById('vision'));
    var top = new Top(document.getElementById('top'));
    var instructions = new Instructions(document.getElementById('instructions'));

	var textArea = document.getElementById('code');
	textArea.textContent = '/* Insert your code here */'
	var editor = CodeMirror.fromTextArea(code, {
		mode: 'javascript',
		lineNumbers: true
	});

    socket.on('game-state', function(data) {
        vision.update(data);
        top.update(data);
    });

    socket.on('instructions', function(data){
        instructions.update(data);
    })
})(io, Vision);
