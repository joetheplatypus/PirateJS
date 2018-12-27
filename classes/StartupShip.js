const Ship = require('./Ship');

class StartupShip extends Ship {
  constructor(params) {
    super(params)
    
    this.className = 'StartupShip'
    this.sendInitPack();
  }
}

module.exports = StartupShip