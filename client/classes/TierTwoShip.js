import ResourceShip from './ResourceShip.js'
import Render from './Render.js'
import Camera from './Camera.js'
import Player from './Player.js'
import GUITextNode from './GUITextNode.js'
import Inventory from './Inventory.js'
import Item from './Item.js'

export default class TierTwoShip extends ResourceShip {
  constructor(params) {
    super(params)
		this.inventory = new Inventory(params.inventory.items)
		this.capacity = params.capacity
	
    this.inventoryGUI = new GUITextNode({text: '', focus:{x:this.x,y:this.y+20}})
  }
  update(params) {
	  super.update(params)
	  this.inventory.update(params.inventory.items)
	  
	  if(Camera.isOnScreen(this) && this.inventory.items.length > 0) {
			const inventoryInfo = this.inventory.items.map((ref) => `${ref.item.name}: ${ref.amount}`)
			this.inventoryGUI.updateFocus({x:this.x,y:this.y+20})
		  this.inventoryGUI.setText(inventoryInfo.toString())
		  this.inventoryGUI.show()
	  } else {
		  this.inventoryGUI.hide()
	  }
  }
  draw() {
		if(this.docked) {
      return
    }
    Render.drawSpritesheetImage(this.x, this.y, this.rotation - Math.PI/2, 'tierTwoShip', true)
  }
}