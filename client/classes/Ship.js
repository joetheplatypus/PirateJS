import Entity from './Entity.js'
import Render from './Render.js'

export default class Ship extends Entity {
  constructor(params) {
    super(params);
	this.parentID = params.parentID
  }
  update(params) {
    super.update(params)
  }
  draw() {
    Render.drawSpritesheetImage(this.x, this.y, this.rotation - Math.PI/2, 'dinghySmall1', true)
  }
}