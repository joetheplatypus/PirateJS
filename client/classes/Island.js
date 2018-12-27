import Render from './Render.js'
import GUI from './GUI.js'
import GameObject from './GameObject.js';
import Player from './Player.js';
import GUITextNode from './GUITextNode.js';
import GUIButton from './GUIButton.js';

export default class Island extends GameObject {
  constructor(params) {
    super(params);
    this.showGUI = false;
    this.ownerID = params.ownerID
  
    this.ownerGUI = new GUITextNode({text:null, focus:{x:this.x,y:this.y}})
    this.claimGUI = new GUIButton({text: 'claim', focus:{x:this.x,y:this.y}, onclick:()=>{Player.socket.emit('claimIsland', this.id)}})
    
  }
  update(params) {
    super.update(params)
    this.ownerID = params.ownerID
    if(this.getDistanceToPoint(GameObject.fromID(GameObject.fromID(Player.selfID).controllingID)) < GUI.showDist ) {
      if(this.ownerID) {
        this.ownerGUI.setText(`Owned by player ${this.ownerID}`)
        this.ownerGUI.show();
        this.claimGUI.hide();
      } else if(!GameObject.fromID(Player.selfID).island) {
        this.claimGUI.show()
      }
    } else {
      this.ownerGUI.hide()
      this.claimGUI.hide()
    }
  }
  draw() {
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y - Render.tileSize, this.rotation, 'islandTopLeft', false)
    Render.drawTilesheetImage(this.x, this.y - Render.tileSize, this.rotation, 'islandTopMiddle', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y - Render.tileSize, this.rotation, 'islandTopRight', false)
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y, this.rotation, 'islandMidLeft', false)
    Render.drawTilesheetImage(this.x, this.y, this.rotation, 'islandMidMiddle', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y, this.rotation, 'islandMidRight', false)
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y + Render.tileSize, this.rotation, 'islandBottomLeft', false)
    Render.drawTilesheetImage(this.x, this.y + Render.tileSize, this.rotation, 'islandBottomMiddle', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + Render.tileSize, this.rotation, 'islandBottomRight', false)
    if(this.ownerID) {
      //console.log(this.ownerID)
      
    }
    
  }
  drawGUI() {
    //GUI.hover.createClaimGUI(this)
    this.showGUI = true
  }
}