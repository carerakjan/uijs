(function(window){

	var UI = function() {
		this._buffer = [];
	};

	UI.prototype.addMethod = function(name, fn) {
		if (!UI.prototype._api) {
			UI.prototype._api = {};
		}
		
		if (!UI.prototype._api[name]) {
			UI.prototype._api[name] = fn.bind(this);	
		}		

		if (!this[name]) {
			this[name] = function() {
				
				var obj = {
					method: name,
					args: arguments
				};

				this._buffer.push(obj);

				if(name.indexOf('if') === 0) {
					obj.children = [];
					obj.children._parent = this._buffer;
					this._buffer = obj.children;
				}

				return this;	

			};
		}
	};

	UI.prototype.endIf = function() {
		this._buffer = this._buffer._parent 
			? this._buffer._parent 
			: this._buffer;
		return this;		
	};

	UI.prototype.getMethod = function(name) {
		return UI.prototype._api[name];
	};

	UI.prototype._play = function(scenario) {
		//???
	};

	UI.prototype.end = function(done) {
		//????
	};

	var ui = new UI();

	ui.addMethod('waitForElement', function(selector) {});
	ui.addMethod('click', function(selector) {});
	ui.addMethod('setValue', function(selector, value) {});
	ui.addMethod('ifAttributeContains', function(selector, attribute, substr) {});
	ui.addMethod('ifAttributeEqual', function(selector, attribute, substr) {});

	window.UI = ui;

})(window);