const Ship = require('./Ship');
const WoodIsland = require('./WoodIsland')
const Inventory = require('./Inventory')
const GameObject = require('./GameObject')
const Item = require('./Item')

class WoodShip extends Ship {
  constructor(params) {
    super(params)
    
	this.dockingDistance = 50;
	this.inventory = new Inventory()
	this.capacity = 200
    this.className = 'WoodShip'
    this.sendInitPack();
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
	  inventory: this.inventory
    }
  }
  update() {
	  super.update()
	  //auto load
	  /*const nearestIsland = GameObject.getNearestInstanceOf(WoodIsland, this)
	  if(this.getDistanceToPoint(nearestIsland) < this.dockingDistance) {
		  if(nearestIsland.canTradeWithPlayer(this.parentID)) {
			this.load(nearestIsland)
		  }
		  
	  }*/
  }
  load(island) {
	  if(this.inventory.items.length > 0) {
		  if(this.inventory.items[0].amount >= this.capacity) {
			  return
		  }
	  }
	  
	  for(var i = 0; i < this.capacity; i++) {
		  if(island.inventory.hasItem(Item.wood) && (this.inventory.items.length === 0 || this.inventory.items[0].amount < this.capacity)) {
			  island.inventory.removeItem(Item.wood)
			this.inventory.addItem(Item.wood)
		  }
	  }
  }
  unload(island) {
	  for(var i = 0; i < this.inventory.items.length; i++) {
		  const amount = this.inventory.items[i].amount
		  for(var j = 0; j < amount; j++) {
			  this.inventory.removeItem(Item.wood)
			  island.inventory.addItem(Item.wood)
		  }
	  }
  }
}

module.exports = WoodShip