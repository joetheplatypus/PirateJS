const Ship = require('./Ship');

class ExplorerShip extends Ship {
  constructor(params) {
    super(params)
    
    this.className = 'ExplorerShip'
    this.sendInitPack();
  }
}

module.exports = ExplorerShip