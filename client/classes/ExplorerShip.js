import Ship from './Ship.js'
import Render from './Render.js'

export default class ExplorerShip extends Ship {
  constructor(params) {
    super(params)
  }
  draw() {
    if(this.docked) {
      return
    }
    Render.drawSpritesheetImage(this.x, this.y, this.rotation - Math.PI/2, 'explorerShip', true)
  }
}