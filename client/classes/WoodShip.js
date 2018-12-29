import Ship from './Ship.js'
import Render from './Render.js'
import Camera from './Camera.js'
import Player from './Player.js'
import GUITextNode from './GUITextNode.js'

export default class WoodShip extends Ship {
  constructor(params) {
    super(params)
	this.inventory = params.inventory
	this.capacity = params.capacity
	
    this.inventoryGUI = new GUITextNode({text: '', focus:{x:this.x,y:this.y+20}})
  }
  update(params) {
	  super.update(params)
	  this.inventory = params.inventory
	  
	  if(Camera.isOnScreen(this) && this.inventory.items.length > 0) {
		  this.inventoryGUI.updateFocus({x:this.x,y:this.y+20})
		  this.inventoryGUI.setText(this.inventory.items[0].item.name + ': ' + this.inventory.items[0].amount)
		  this.inventoryGUI.show()
	  } else {
		  this.inventoryGUI.hide()
	  }
  }
  draw() {
		if(this.docked) {
      return
    }
    Render.drawSpritesheetImage(this.x, this.y, this.rotation - Math.PI/2, 'woodShip', true)
  }
}