import GUIButton from './GUIButton.js'
import GUI from './GUI.js'
import Player from './Player.js'

export default class GUIDockMenu extends GUI {
  constructor(params) {
    super(params)
    this.repairShip = new GUIButton({text: 'Repair Ship', focus:{x:params.focus.x, y:params.focus.y}, onclick:()=>{}})
    this.createShip = new GUIButton({text: 'Create Ship', focus:{x:params.focus.x, y:params.focus.y+30}, onclick:()=>{}})
    this.upgradeShip = new GUIButton({text: 'Upgrade Ship', focus:{x:params.focus.x, y:params.focus.y+60}, onclick:()=>{}})
    this.upgradeDock = new GUIButton({text: 'Upgrade Dock', focus:{x:params.focus.x, y:params.focus.y+90}, onclick:()=>{}})

    this.createShip.disable();
    this.repairShip.disable()

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