import Ship from './Ship.js'
import Render from './Render.js'
import Camera from './Camera.js'

export default class StartupShip extends Ship {
  constructor(params) {
    super(params)
  }
  draw() {
    if(this.docked) {
      return
    }
    Render.drawSpritesheetImage(this.x + this.width/2, this.y + this.height/2, this.rotation - Math.PI/2, 'startupShip', true)
    
  }
}