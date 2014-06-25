(function($){
    var Instructions = $.Instructions = function(container){
        this.container = container;
        this.update('Awaiting instructions');
    };

    Instructions.prototype.update = function(message) {
		this.container.textContent = message || '';
    }
})(window || module.exports);
