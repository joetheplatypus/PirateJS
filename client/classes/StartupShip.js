import Ship from './Ship.js'
import Render from './Render.js'

export default class StartupShip extends Ship {
  constructor(params) {
    super(params)
  }
  draw() {
    Render.drawSpritesheetImage(this.x, this.y, this.rotation - Math.PI/2, 'startupShip', true)
  }
}