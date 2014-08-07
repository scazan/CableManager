
define([
],
function() {

	var CableManager = function PatchCablesConstructor(options) {

		this.pathDefaults = {
			stroke: "#666",
			'stroke-width': 2,
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
		this.parentEl.style.pointerEvents = 'none';

		//if(options && options.pathDefaults) {
		// extend the pathDefaults object here
		//}


	};

	CableManager.prototype = {
		connections: [],
		createConnection: function(coords, options) {
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

			newPath.className += 'connection';
			this.parentEl.appendChild(newPath);

			var newConnection = {
				el: newPath,
				id: this.connections.length,
				from: coords.from,
				to: coords.to,
			};

			this.updateCoordinates(newConnection, coords);
			this.connections.push(newConnection);

			return newConnection;
		},
		updateCoordinates: function(connection, coords) {
			var pathEl = connection.el;
			if(coords.from) {
				connection.from = coords.from;
			}
			if(coords.to) {
				connection.to = coords.to;
			}
				var toX = connection.to.x - connection.from.x,
					toY = connection.to.y - connection.from.y;

			pathEl.setAttribute('d', 'M ' + connection.from.x + ',' + connection.from.y + ' l ' + toX + ',' + toY);
		},
	};

	return CableManager;
})

