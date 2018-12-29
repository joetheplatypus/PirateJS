import Render from './Render.js'
import GUI from './GUI.js'
import GameObject from './GameObject.js';
import Player from './Player.js';
import GUITextNode from './GUITextNode.js';
import GUIResourceCounter from './GUIResourceCounter.js';
import GUIButton from './GUIButton.js';
import Camera from './Camera.js'
import ExplorerShip from './ExplorerShip.js'
import WoodShip from './WoodShip.js'

export default class WoodIsland extends GameObject {
  constructor(params) {
    super(params);
	this.tradeRoutes = params.tradeRoutes
	this.inventory = params.inventory
  
    //this.debug = new GUITextNode({text:'wood island', focus:{x:this.x,y:this.y}})
    this.tradeGUI = new GUIButton({text: 'Open Trade Route', focus:{x:this.x-30,y:this.y}, onclick:()=>{Player.socket.emit('openTradeRoute', this.id)}})
    this.loadShipGUI = new GUIButton({text: 'Load Ship', focus:{x:this.x-10,y:this.y}, onclick:()=>{Player.socket.emit('loadShip', {islandID:this.id,shipID:GameObject.fromID(Player.selfID).controllingID})}})
    //this.tradersGUI = new GUITextNode({text: '', focus:{x:this.x,y:this.y+10}})
    this.productionGUI = new GUIResourceCounter({amount: '', img:'client/img/wood.png', focus:{x:this.x+125,y:this.y-60}})
    
  }
  update(params) {
	  this.tradeRoutes = params.tradeRoutes
	  this.inventory = params.inventory
	  
	  
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
			  this.productionGUI.setAmount(this.inventory.items[0].amount)
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
		  if(ship instanceof WoodShip && selfTrading) {
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
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y - Render.tileSize, this.rotation, 'islandTopLeft', false)
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y - Render.tileSize, this.rotation, 'smallTrees', false)
    Render.drawTilesheetImage(this.x, this.y - Render.tileSize, this.rotation, 'islandTopMiddle', false)
    Render.drawTilesheetImage(this.x, this.y - Render.tileSize, this.rotation, 'smallTree', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y - Render.tileSize, this.rotation, 'islandTopRight', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y - Render.tileSize, this.rotation, 'smallTrees', false)
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y, this.rotation, 'islandMidLeft', false)
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y, this.rotation, 'smallTree', false)
    Render.drawTilesheetImage(this.x, this.y, this.rotation, 'islandMidMiddle', false)
    Render.drawTilesheetImage(this.x, this.y, this.rotation, 'bigTree', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y, this.rotation, 'islandMidRight', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y, this.rotation, 'smallTree', false)
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y + Render.tileSize, this.rotation, 'islandBottomLeft', false)
    Render.drawTilesheetImage(this.x - Render.tileSize, this.y + Render.tileSize, this.rotation, 'smallTrees', false)
    Render.drawTilesheetImage(this.x, this.y + Render.tileSize, this.rotation, 'islandBottomMiddle', false)
    Render.drawTilesheetImage(this.x, this.y + Render.tileSize, this.rotation, 'smallTree', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + Render.tileSize, this.rotation, 'islandBottomRight', false)
    Render.drawTilesheetImage(this.x + Render.tileSize, this.y + Render.tileSize, this.rotation, 'smallTrees', false)
    
  }
}