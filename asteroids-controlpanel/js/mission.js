(function($){
    var Mission = $.Mission = function(container){
        this.container = container;
        this.update('Awaiting instructions');
    };

    Mission.prototype.update = function(message) {
		this.container.textContent = message || '';
    }
})(window || module.exports);
