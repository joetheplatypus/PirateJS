import Entity from './Entity.js'
import Render from './Render.js'

export default class Ship extends Entity {
  constructor(params) {
    super(params);
    this.parentID = params.parentID
    this.docked = params.docked
    this.width = params.width
    this.height = params.height
    console.log(this.width)
  }
  update(params) {
    super.update(params)
    this.docked = params.docked
  }
  draw() {
    if(this.docked) {
      return
    }
    
    Render.drawSpritesheetImage(this.x, this.y, this.rotation - Math.PI/2, 'dinghySmall1', true)
  }
}