(function(localStorage, io, CodeMirror, Vision, Top, Instructions){
   var socket = io.connect(window.location.origin);

	if (!localStorage['code']) {
		localStorage['code'] = '/* Insert your code here*/'
	}

    socket.emit('viewer', {});

    var vision = new Vision(document.getElementById('vision'));
    var top = new Top(document.getElementById('top'));
    var instructions = new Instructions(document.getElementById('instructions'));

    var textArea = document.getElementById('code');
    textArea.textContent = localStorage['code'];
    var editor = CodeMirror.fromTextArea(code, {
        mode: 'javascript',
        lineNumbers: true
    });
    editor.on('change', function(instance, change){
		localStorage['code'] = instance.getValue();
        socket.emit('code-change', {
            timestamp: (new Date()).getTime(),
            code: instance.getValue()
        });
    });

    socket.on('game-state', function(data) {
        vision.update(data);
        top.update(data);
    });

    socket.on('instructions', function(data){
        instructions.update(data);
    });

	var codeStatus = document.getElementById('code-status');
    socket.on('compile error', function(data){
		codeStatus.style = 'background:red;';
    });
    socket.on('runtime error', function(data){
		codeStatus.style = 'background:yellow;';
    });
    socket.on('compiled', function(data){
		codeStatus.style = 'background:green;';
    });

})(localStorage || {}, io, CodeMirror, Vision, Top, Instructions);
