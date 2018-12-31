import GUIButton from './GUIButton.js'
import GUI from './GUI.js'
import Player from './Player.js'

export default class GUIDockMenu extends GUI {
  constructor(params) {
    super(params)
    this.dockID = params.dockID
    this.repairShip = new GUIButton({text: 'Repair Ship', focus:{x:params.focus.x, y:params.focus.y}, onclick:()=>{Player.socket.emit('repairShip', params.dockID)}})
    this.createShip = new GUIButton({text: 'Create Ship', focus:{x:params.focus.x, y:params.focus.y+30}, onclick:()=>{Player.socket.emit('createShip', params.dockID)}})
    this.upgradeShip = new GUIButton({text: 'Upgrade Ship', focus:{x:params.focus.x, y:params.focus.y+60}, onclick:()=>{Player.socket.emit('upgradeShip', params.dockID)}})
    this.upgradeDock = new GUIButton({text: 'Upgrade Dock', focus:{x:params.focus.x, y:params.focus.y+90}, onclick:()=>{Player.socket.emit('upgradeDock', params.dockID)}})

    this.repairShip.disable();
    this.createShip.disable()
    this.upgradeShip.disable()
    this.upgradeDock.disable()

  }
  hide() {
    this.repairShip.hide()
    this.createShip.hide()
    this.upgradeDock.hide()
    this.upgradeShip.hide()
  }
  show() {
    this.repairShip.show()
    this.createShip.show()
    this.upgradeDock.show()
    this.upgradeShip.show()
  }
  updatePos({x,y}) {
    this.repairShip.updatePos({x:x,y:y})
    this.createShip.updatePos({x:x,y:y+30})
    this.upgradeDock.updatePos({x:x,y:y+60})
    this.upgradeShip.updatePos({x:x,y:y+90})
  }

}