
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
			// Temporary removal while debugging some issues
			//parentEl.classList.add('patchCableParent');

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

			var newConnection = new Cable({
				el: newPath,
				id: this.connections.length,
				from: coords.from,
				to: coords.to,
			});

			newConnection.updateCoordinates(coords);
			this.connections.push(newConnection);

			return newConnection;
		},
		removeConnection: function removeConnection(id) {
			var indexOfID = undefined,
				foundID = false;

			for(var i=this.connections.length-1; i>=0 && foundID == false; i--) {
				if(this.connections[i].id == id) {
					foundID = true;
					indexOfID = i;
				}
			}

			this.connections.splice(indexOfID, 1);
		},
	};

	var Cable = function(options) {
		this.el = options.el;
		this.id = options.id;
		this.from = options.from;
		this.to = options.to;
	};

	Cable.prototype = {
		updateCoordinates: function(coords) {
			var pathEl = this.el;
			if(coords.from) {
				this.from = coords.from;
			}
			if(coords.to) {
				this.to = coords.to;
			}
				var toX = this.to.x - this.from.x,
					toY = this.to.y - this.from.y;

			pathEl.setAttribute('d', 'M ' + this.from.x + ',' + this.from.y + ' l ' + toX + ',' + toY);
		},
		remove: function() {
			this.el && this.el.parentNode.removeChild(this.el);
			this.from = this.to = this.el = undefined;

			return this.id;
		},
	};

	return CableManager;
})

