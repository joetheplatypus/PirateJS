import Render from './Render.js'
import GameObject from './GameObject.js';
import GUIButton from './GUIButton.js';
import Player from './Player.js';
import Camera from './Camera.js';
import GUI from './GUI.js';

export default class Dock extends GameObject {
  constructor(params) {
    super(params)
    this.playerID = params.playerID
    this.islandID = params.islandID
    this.dockedShip = params.dockedShip

    this.dockShipGUI = new GUIButton({text:'Dock Ship', focus:{x:this.x,y:this.y}, onclick:()=>{Player.socket.emit('dockShip', {dock:this.id,ship:GameObject.fromID(Player.selfID).controllingID})}})
    this.unDockShipGUI = new GUIButton({text:'Undock Ship', focus:{x:this.x,y:this.y}, onclick:()=>{Player.socket.emit('undockShip', this.id)}})
  }
  update(params) {
    this.playerID = params.playerID
    this.dockedShip = params.dockedShip

    const controllingShip = GameObject.fromID(GameObject.fromID(Player.selfID).controllingID)
    if(Camera.isOnScreen(this) && this.getDistanceToPoint(controllingShip) < GUI.showDist) {
      this.dockShipGUI.show()
    } else {
      this.dockShipGUI.hide()
    }

    if(Camera.isOnScreen(this) && this.getDistanceToPoint(controllingShip) < GUI.showDist && this.dockedShip) {
      this.unDockShipGUI.show()
    } else {
      this.unDockShipGUI.hide()
    }

  }
  draw() {
    Render.drawSpritesheetImage(this.x, this.y, this.rotation, 'startupShip', true)
  }
}