const ResourceShip = require('./ResourceShip');
const WoodIsland = require('./WoodIsland')
const Inventory = require('./Inventory')
const GameObject = require('./GameObject')
const Item = require('./Item')

class TierTwoShip extends ResourceShip {
  constructor(params) {
    super(params)
    
    this.capacity = new Map([[Item.wood, 400],[Item.stone, 100]])
    this.tier = 2;
		this.className = 'TierTwoShip'
    this.sendInitPack();
  }
}

module.exports = TierTwoShip