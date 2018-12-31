import Render from './Render.js'
import GUI from './GUI.js'
import GameObject from './GameObject.js';
import Player from './Player.js';
import GUITextNode from './GUITextNode.js';
import GUIResourceCounter from './GUIResourceCounter.js';
import GUIButton from './GUIButton.js';
import Camera from './Camera.js'
import ExplorerShip from './ExplorerShip.js'
import TierOneShip from './TierOneShip.js'
import Inventory from './Inventory.js'
import Item from './Item.js'

export default class StoneIsland extends GameObject {
  constructor(params) {
    super(params);
		this.tradeRoutes = params.tradeRoutes
		this.inventory = new Inventory(params.inventory.items)
  
    //this.debug = new GUITextNode({text:'wood island', focus:{x:this.x,y:this.y}})
    this.tradeGUI = new GUIButton({text: 'Open Trade Route', focus:{x:this.x+34,y:this.y+64}, onclick:()=>{Player.socket.emit('openTradeRoute', this.id)}})
    this.loadShipGUI = new GUIButton({text: 'Load Ship', focus:{x:this.x+54,y:this.y+64}, onclick:()=>{Player.socket.emit('loadShip', {islandID:this.id,shipID:GameObject.fromID(Player.selfID).controllingID})}})
    //this.tradersGUI = new GUITextNode({text: '', focus:{x:this.x,y:this.y+10}})
    this.productionGUI = new GUIResourceCounter({amount: '', img:'client/img/wood.png', focus:{x:this.x+189,y:this.y+4}})
    
  }
  update(params) {
	  this.tradeRoutes = params.tradeRoutes
	  this.inventory.update(params.inventory.items)
	  
	  
	  let selfTrading = false
	  if(this.tradeRoutes.find((route) => route.playerID === Player.selfID)) {
		  selfTrading = true
	  }
		  
	  if(Camera.isOnScreen(this)) {
		  if(this.tradeRoutes.length > 0) {
			  //this.tradersGUI.setText('trading with: ' + this.tradeRoutes.map((route) => route.playerID).join())
			  //this.tradersGUI.show()
		  } else {
			  //this.tradersGUI.hide()
		  }
		  
		  
		  if(selfTrading) {
			  this.productionGUI.setAmount(this.inventory.amountOfItem(Item.stone))
			  this.productionGUI.show()
		  } else {
			  this.productionGUI.hide()
		  }
	  } else {
		  //this.tradersGUI.hide()
		  this.productionGUI.hide()
	  }
	  
	  
	  const ship = GameObject.fromID(GameObject.fromID(Player.selfID).controllingID)
	  const distToShip = this.getDistanceToPoint(ship);
	  if(distToShip < GUI.showDist) {
		  if(ship instanceof ExplorerShip && !selfTrading) {
			  this.tradeGUI.show()
		  } else {
			  this.tradeGUI.hide()
		  }
		  if(ship instanceof TierOneShip && selfTrading) {
			  this.loadShipGUI.show()
		  } else {
			  this.loadShipGUI.hide()
		  }
	  } else {
		  this.tradeGUI.hide();
		  this.loadShipGUI.hide()
	  }
	  
  }
    
  draw() {
    Render.drawTilesheetImage(this.x, this.y, this.rotation, 'islandTopLeft', false)
    Render.drawTilesheetImage(this.x, this.y, this.rotation, 'smallStone', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y, this.rotation, 'islandTopMiddle', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y, this.rotation, 'smallStone', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y, this.rotation, 'islandTopRight', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y, this.rotation, 'smallStone', false)
    Render.drawTilesheetImage(this.x, this.y + Render.tileSize, this.rotation, 'islandMidLeft', false)
    Render.drawTilesheetImage(this.x, this.y + Render.tileSize, this.rotation, 'smallStone', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + Render.tileSize , this.rotation, 'islandMidMiddle', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + Render.tileSize, this.rotation, 'bigStone', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y + Render.tileSize, this.rotation, 'islandMidRight', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y + Render.tileSize, this.rotation, 'smallStone', false)
    Render.drawTilesheetImage(this.x, this.y + 2*Render.tileSize, this.rotation, 'islandBottomLeft', false)
    Render.drawTilesheetImage(this.x, this.y + 2*Render.tileSize, this.rotation, 'smallStone', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + 2*Render.tileSize, this.rotation, 'islandBottomMiddle', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + 2*Render.tileSize, this.rotation, 'smallStone', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y + 2*Render.tileSize, this.rotation, 'islandBottomRight', false)
    Render.drawTilesheetImage(this.x + 2*Render.tileSize, this.y + 2*Render.tileSize, this.rotation, 'smallStone', false)
    
  }
}