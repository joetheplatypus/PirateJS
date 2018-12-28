const Island = require('./Island');
const Inventory = require('./Inventory')

class PlayerIsland extends Island {
  constructor(params) {
    super(params);
    this.ownerID = null
	this.claimable = true
	this.inventory = new Inventory()
    this.className = 'PlayerIsland'
    this.sendInitPack()
  }
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
      ownerID: this.ownerID,
	  inventory: this.inventory
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      ownerID: this.ownerID,
	  inventory: this.inventory
    }
  }
  setOwnerID(owner) {
    this.ownerID = owner
  }
}
module.exports = PlayerIsland