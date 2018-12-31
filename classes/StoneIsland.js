const Island = require('./Island')
const Inventory = require('./Inventory')
const Item = require('./Item')

class StoneIsland extends Island {
	constructor(params) {
		super(params)
		this.loadable = true
		this.resourceType = 'stone'
		this.tradeRoutes = []
		this.inventory = new Inventory()
		this.className = 'StoneIsland'
		this.sendInitPack()
	}
	update() {
		if(this.tradeRoutes.length > 0) {
			this.inventory.addItem(Item.stone)
		}
	}
	canTradeWithPlayer(id) {
		if(this.tradeRoutes.find((route) => route.playerID == id)) {
			return true
		}
		return false
	}
	getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
      tradeRoutes: this.tradeRoutes,
      inventory: this.inventory,
      
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      tradeRoutes: this.tradeRoutes,
      inventory: this.inventory
    }
  }
}

module.exports = StoneIsland