const Ship = require('./Ship');
const WoodIsland = require('./WoodIsland')
const Inventory = require('./Inventory')
const GameObject = require('./GameObject')
const Item = require('./Item')

class ResourceShip extends Ship {
  constructor(params) {
    super(params)
    
		this.dockingDistance = 50;
		this.inventory = new Inventory()
		this.capacity = new Map([[Item.wood, 0],[Item.stone, 0]])
		this.className = 'ResourceShip'
  }
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
      maxHealth: this.maxHealth,
      health: this.health,
			inventory: this.inventory,
			docked: this.docked,
	  	capacity: this.capacity
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
			health: this.health,
			docked: this.docked,
	 		inventory: this.inventory
    }
  }
  getResourceCapacity(item) {
    const capacity = this.capacity.get(item)
    if(capacity) {
      return capacity
    }
    return 0
  }
  load(island) {
    

    for(var i = 0; i < island.inventory.items.length; i++) {
      const item = island.inventory.items[i].item;
      const amount = island.inventory.items[i].amount
      const shipCapacity = this.getResourceCapacity(item)

      if(this.inventory.items.length === 1 && this.inventory.items[0].item.name !== item.name) {
        return //only can have one resource on a ship at a time
      }
      
      for(var j = 0; j < amount; j++) {
        if(shipCapacity > this.inventory.amountOfItem(item)) {
          island.inventory.removeItem(item)
			    this.inventory.addItem(item)
        }
      }
    }
  }
  unload(island) {
	  for(var i = 0; i < this.inventory.items.length; i++) {
      const item = this.inventory.items[i].item
		  const amount = this.inventory.amountOfItem(item)
		  for(var j = 0; j < amount; j++) {
			  this.inventory.removeItem(item)
			  island.inventory.addItem(item)
		  }
	  }
  }
}

module.exports = ResourceShip