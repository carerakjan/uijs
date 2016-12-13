(function(window){

	var UI = function() {
		this._signatures = [];
	};

	UI.prototype.addMethod = function(name, fn) {
		if (!UI.prototype._api) {
			UI.prototype._api = {};
		}

		if (!UI.prototype._api[name]) {
			UI.prototype._api[name] = function() {
				console.log(name, arguments);
				return fn.apply(this._api, arguments);
			}.bind(this);
		}

		if (!this[name]) {
			this[name] = function() {

				var obj = {
					method: name,
					args: arguments
				};

				this._signatures.push(obj);

				if(name.indexOf('if') === 0) {
					obj.children = [];
					obj.children._head = this._signatures;
					this._signatures = obj.children;
				}

				return this;

			};
		}
	};

	UI.prototype.endIf = function() {
		this._signatures = this._signatures._head
			? this._signatures._head
			: this._signatures;
		return this;
	};
	
	UI.prototype._resetHead = function() {
		if (this._signatures._head) {
			this._signatures = this._signatures._head;
			this._resetHead();
		}
	};

	UI.prototype.getMethod = function(name) {
		return UI.prototype._api[name];
	};

	UI.prototype._play = function(scenario) {

		scenario = scenario || this._signatures;

		if (!scenario.length) {
			return;
		}

		var api = this._api;
		var obj = scenario.shift();
		var result = this.getMethod(obj.method).apply(api, obj.args);

		if (obj.children && result) {
			this._play(obj.children);
		}

		this._play(scenario);
	};

	UI.prototype.end = function(done) {
		this._resetHead();
		this._play();
	};

	var ui = new UI();

	ui.addMethod('waitForElement', function(selector) {});
	ui.addMethod('click', function(selector) {});
	ui.addMethod('setValue', function(selector, value) {});
	ui.addMethod('ifAttributeContains', function(selector, attribute, substr, bool) {
		//todo: for show/hide branch
		return bool;
	});
	ui.addMethod('ifAttributeEqual', function(selector, attribute, substr) {});


	ui.addMethod('ifElementPresent', function(selector) {});
	ui.addMethod('ifElementVisible', function(selector) {});
	ui.addMethod('ifChecked', function(selector) {});
	ui.addMethod('ifHasVerticalScrollBar', function(selector) {});
	ui.addMethod('ifValueContains', function(selector, substr) {});

	window.UI = ui;

})(window);