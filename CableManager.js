define([
],
function() {

	var CableManager = function PatchCablesConstructor(options) {

		this.pathDefaults = {
			stroke: "black",
			'stroke-width': 5,
			fill: "none",
		};


			if(options && options.el) {
				this.parentEl = options.el;
			}
			else {
				var parentEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				parentEl.className += 'patchCableParent';

				this.parentEl = parentEl;
				this.width = "100%";
				this.height = "100%";
				document.body.appendChild(parentEl);
			}

			//if(options && options.pathDefaults) {
				// extend the pathDefaults object here
			//}


	};

	CableManager.prototype = {
		connections: [],
		createConnection: function(coords, options) {
			var from = coords.from;
			var toX = coords.to.x - from.x,
				toY = coords.to.y - from.y;
			var to = {x: toX, y: toY};

			var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

			// TODO: make this extend instead of doing it this way
			for(var option in this.pathDefaults) {
				newPath.setAttribute(option, this.pathDefaults[option]);
			}

			if(options) {
				for(var option in options) {
					newPath.setAttribute(option, options[option]);
				}
			}

			newPath.setAttribute('d', 'M ' + from.x + ',' + from.y + ' l ' + to.x + ',' + to.y);
			newPath.className += 'connection';
			this.parentEl.appendChild(newPath);

			var newConnection = {
				el: newPath,
				id: this.connections.length - 1,
			};

			this.connections.push(newConnection);

			return newConnection;
		},
	};

	return CableManager;
})
