const Island = require('./Island');
const Inventory = require('./Inventory')
const Item = require('./Item')
const Dock = require('./Dock')

class PlayerIsland extends Island {
  constructor(params) {
    super(params);
    this.ownerID = null
	  this.claimable = true
	  this.inventory = new Inventory()
    this.className = 'PlayerIsland'
    this.dock = null;
    this.sendInitPack()
  }
  createDock() {
    this.dock = new Dock(this)
    this.inventory.removeItems(Item.wood,300)
  }
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
      ownerID: this.ownerID,
      inventory: this.inventory,
      dock: this.dock,
      width: this.width,
		  height: this.height
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      ownerID: this.ownerID,
      inventory: this.inventory,
      dock: this.dock
    }
  }
  setOwnerID(owner) {
    this.ownerID = owner
  }
}
module.exports = PlayerIsland