(function(io){
    var socket = io.connect(window.location.origin);

    socket.emit('control', {});

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event){
         socket.emit('control-event', {
                timestamp : (new Date()).getTime(),
                alpha : event.alpha,
                beta : event.beta,
                gamma : event.gamma
         });
        }, false);
    }
})(io);
