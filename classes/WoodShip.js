const Ship = require('./Ship');

class WoodShip extends Ship {
  constructor(params) {
    super(params)
    
    this.className = 'WoodShip'
    this.sendInitPack();
  }
}

module.exports = WoodShip