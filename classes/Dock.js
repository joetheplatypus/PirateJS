const GameObject = require('./GameObject')

class Dock extends GameObject{
  constructor(island) {
    super({
      x:island.x+40,
      y:island.y
    })
    this.islandID = island.id
    this.dockedShip = null
    this.playerID = island.ownerID
    this.className = 'Dock'
    this.sendInitPack()
  }
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
      dockedShip: this.dockedShip
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      dockedShip: this.dockedShip
    }
  }
  dockShip(ship) {
    if(this.dockedShip) {
      return
    }
    this.dockedShip = ship
    ship.docked = this.id
    ship.x = this.x;
    ship.y = this.y-150
  }
  undockShip() {
    this.dockedShip.docked = false
    this.dockedShip = null
  }
}

module.exports = Dock