import GameObject from './GameObject.js'
import Render from './Render.js'
import Camera from './Camera.js'

export default class Player extends GameObject{
  constructor(params) {
    super(params)
    this.controllingID = params.controllingID
    this.ships = params.ships
    this.island = params.island
    this.tradeRoutes = params.tradeRoutes
    this.name = params.name
  }
  update(params) {
    super.update(params);
    this.controllingID = params.controllingID
    this.ships = params.ships
    this.island = params.island
	  this.tradeRoutes = params.tradeRoutes

    if(this.id === Player.selfID) {
      if(this.controllingID) {
        const obj = GameObject.fromID(this.controllingID)
        Camera.setFocus(obj.x, obj.y)
      }
    }
  }
  draw() {
	  
  }
}
Player.selfID = null;
Player.socket = null