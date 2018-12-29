import Render from './Render.js'
import GUI from './GUI.js'
import GameObject from './GameObject.js';
import Player from './Player.js';
import GUITextNode from './GUITextNode.js';
import GUIButton from './GUIButton.js';
import GUIResourceCounter from './GUIResourceCounter.js'
import Camera from './Camera.js'

export default class PlayerIsland extends GameObject {
  constructor(params) {
    super(params);
    this.showGUI = false;
    this.ownerID = params.ownerID
    this.inventory = params.inventory
    this.dock = params.dock
    this.height = params.height
    this.width = params.width
  
    this.ownerGUI = new GUITextNode({text:null, focus:{x:this.x-26,y:this.y-26}})
    this.claimGUI = new GUIButton({text: 'Claim Island', focus:{x:this.x+44,y:this.y+64}, onclick:()=>{Player.socket.emit('claimIsland', this.id)}})
    this.unloadShipGUI = new GUIButton({text: 'Unload Ship', focus:{x:this.x+54,y:this.y+64}, onclick:()=>{Player.socket.emit('unloadShip', GameObject.fromID(Player.selfID).controllingID)}})
	  this.inventoryWoodGUI = new GUIResourceCounter({amount: '', img:'client/img/wood.png', focus:{x:this.x+189,y:this.y+4}})
	  this.createDockGUI = new GUIButton({text:'Create Dock', focus:{x:this.x+49,y:this.y+99}, onclick:()=>{Player.socket.emit('createDock', this.id)}})
  }
  update(params) {
    super.update(params)
    this.ownerID = params.ownerID
    this.inventory = params.inventory
    this.dock = params.dock

    if(this.getDistanceToPoint(GameObject.fromID(GameObject.fromID(Player.selfID).controllingID)) < GUI.showDist ) {
      if(this.ownerID) {
        this.ownerGUI.setText(`Owned by player ${this.ownerID}`)
        this.ownerGUI.show();
        this.claimGUI.hide();
        if(this.ownerID === Player.selfID) {
          const ship = GameObject.fromID(GameObject.fromID(Player.selfID).controllingID)
          if(ship.inventory && ship.inventory.items.length > 0 ) {
            this.unloadShipGUI.show()
          } else {
            this.unloadShipGUI.hide()
          }
         
        }
      } else if(!GameObject.fromID(Player.selfID).island) {
        this.claimGUI.show()
      } else {
        this.claimGUI.hide()
      }
    } else {
      this.ownerGUI.hide()
	    this.unloadShipGUI.hide()
      this.claimGUI.hide()
      this.createDockGUI.hide()
    }
	
	if(Camera.isOnScreen(this) && this.inventory.items.length > 0) {
		  //this.inventoryGUI.setText(this.inventory.items[0].item.name + ': ' + this.inventory.items[0].amount)
		  //this.inventoryGUI.show()
		  this.inventoryWoodGUI.setAmount(this.inventory.items[0].amount)
      this.inventoryWoodGUI.show()
      
      if(this.inventory.items[0].amount > 300 && !this.dock) {
        this.createDockGUI.show()
      } else {
        this.createDockGUI.hide()
      }

	  } else {
		  //this.inventoryGUI.hide()
      this.inventoryWoodGUI.hide()
      this.createDockGUI.hide()
	  }
  }
  draw() {
    Render.drawTilesheetImage(this.x, this.y, this.rotation, 'islandTopLeft', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y, this.rotation, 'islandTopMiddle', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y, this.rotation, 'islandTopRight', false)
    Render.drawTilesheetImage(this.x, this.y + Render.tileSize, this.rotation, 'islandMidLeft', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + Render.tileSize, this.rotation, 'islandMidMiddle', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y + Render.tileSize, this.rotation, 'islandMidRight', false)
    Render.drawTilesheetImage(this.x, this.y + 2*Render.tileSize, this.rotation, 'islandBottomLeft', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + 2*Render.tileSize, this.rotation, 'islandBottomMiddle', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y + 2*Render.tileSize, this.rotation, 'islandBottomRight', false)
    if(this.ownerID) {
      //console.log(this.ownerID)
      
    }
    
  }
  drawGUI() {
    //GUI.hover.createClaimGUI(this)
    this.showGUI = true
  }
}