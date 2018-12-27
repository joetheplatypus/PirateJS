import Render from './Render.js'
import GUI from './GUI.js'
import GameObject from './GameObject.js';
import Player from './Player.js';
import GUITextNode from './GUITextNode.js';
import GUIButton from './GUIButton.js';
import Camera from './Camera.js'
import ExplorerShip from './ExplorerShip.js'

export default class WoodIsland extends GameObject {
  constructor(params) {
    super(params);
	this.tradeRoutes = params.tradeRoutes
	this.inventory = params.inventory
  
    this.debug = new GUITextNode({text:'wood island', focus:{x:this.x,y:this.y}})
    this.tradeGUI = new GUIButton({text: 'Open Trade Route', focus:{x:this.x,y:this.y}, onclick:()=>{Player.socket.emit('openTradeRoute', this.id)}})
    this.tradersGUI = new GUITextNode({text: '', focus:{x:this.x,y:this.y+10}})
    this.productionGUI = new GUITextNode({text: '', focus:{x:this.x,y:this.y+20}})
    
  }
  update(params) {
	  this.tradeRoutes = params.tradeRoutes
	  this.inventory = params.inventory
	  
	  
	  let selfTrading = false
	  if(this.tradeRoutes.find((route) => route.playerID === Player.selfID)) {
		  selfTrading = true
	  }
		  
	  if(Camera.isOnScreen(this)) {
		  this.debug.show()
		  if(this.tradeRoutes.length > 0) {
			  console.log(this.tradeRoutes)
			  this.tradersGUI.setText('trading with: ' + this.tradeRoutes.map((route) => route.playerID).join())
			  this.tradersGUI.show()
		  } else {
			  this.tradersGUI.hide()
		  }
		  
		  
		  if(selfTrading) {
			  this.productionGUI.setText(this.inventory.items[0].item.name + ': ' + this.inventory.items[0].amount)
			  this.productionGUI.show()
		  } else {
			  this.productionGUI.hide()
		  }
	  } else {
		  this.tradersGUI.hide()
		  this.debug.hide()
		  this.productionGUI.hide()
	  }
	  
	  
	  
	  
	if(this.getDistanceToPoint(GameObject.fromID(GameObject.fromID(Player.selfID).controllingID)) < GUI.showDist && GameObject.fromID(GameObject.fromID(Player.selfID).controllingID) instanceof ExplorerShip && !selfTrading ) {
		this.tradeGUI.show();
    } else {
		this.tradeGUI.hide()
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
    
  }
}