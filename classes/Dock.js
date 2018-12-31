const GameObject = require('./GameObject')
const Item = require('./Item')
const TierOneShip = require('./TierOneShip')
const TierTwoShip = require('./TierTwoShip')

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
      dockedShip: this.dockedShip,
      islandID: this.islandID
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      dockedShip: this.dockedShip,
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
  upgrade() {

  }
  upgradeShip(ship) {
    const owner = GameObject.fromID(this.playerID)
    const island = owner.island
    if(ship instanceof TierOneShip) {
      if(island.inventory.amountOfItem(Item.wood) >= 500) {
        island.inventory.removeItems(Item.wood, 500)

        const newShip = new TierTwoShip({x:ship.x,y:ship.y,parentID:this.playerID})
        this.undockShip(ship)
        GameObject.remove(ship)

        this.dockShip(newShip)
        owner.ships[owner.ships.indexOf(ship)] = newShip
        owner.controlling = newShip
        
      }
    }
  }
  createShip() {

  }
  repairShip(ship) {

  }
}

module.exports = Dock