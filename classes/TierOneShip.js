const ResourceShip = require('./ResourceShip');
const WoodIsland = require('./WoodIsland')
const Inventory = require('./Inventory')
const GameObject = require('./GameObject')
const Item = require('./Item')

class TierOneShip extends ResourceShip {
  constructor(params) {
    super(params)
    
		this.capacity = new Map([[Item.wood, 200],[Item.stone, 10]])
		this.className = 'TierOneShip'
    this.sendInitPack();
  }
}

module.exports = TierOneShip