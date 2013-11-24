(function(){
    var follow = function(url){
	var origin = window.location.origin;
	return function(){
	    window.location = origin + url;
	}
    }
    var actions = {
	'view': follow('/view'),
	'control': follow('/control')
    }
    for (var id in actions){
	var element = document.getElementById(id);
	element.addEventListener('click', actions[id]);

    }
})();
