const Ship = require('./Ship');

class ExplorerShip extends Ship {
  constructor(params) {
    super(params)
    
    this.width = 20;
    this.height = 20;
    this.className = 'ExplorerShip'
    this.sendInitPack();
  }
}

module.exports = ExplorerShip