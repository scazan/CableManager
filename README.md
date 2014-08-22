CableManager
============

A lightweight library for generating and managing patch cables (or any set of lines and coordinates). Most useful if you want to creata  Max/MSP style patching environment.

To use, import via require first then:

    // create a new CableManager
    var cableManager = new CableManager();
    
    // to add a new patch cable from coordinates (20,30) to (230, 550)
    var patchCable = cableManager.createConnection({
      from: {x: 20, y: 30},
      to: {x: 230, y: 550},
    });
    
    // optionally you can also pass any SVG attributes you want through an options object
    var patchCable = cableManager.createConnection({
      from: {x: 20, y: 30},
      to: {x: 230, y: 550},
    }, {
      stroke: 'red',
      'stroke-width': 5px,
    });
    
    // tie the movement of your objects to this method to update locations
    patchCable.updateCoordinates({
      from: {x: 120, y: 530},
      to: {x: 20, y: 50},
    });
    
    // OR since you are likely only moving one, pass just the updated coordinates
    patchCable.updateCoordinates({
      to: {x: 20, y: 50},
    });
    
    // To remove a cable and its associated DOM elements
    patchCable.remove();

More to come!
