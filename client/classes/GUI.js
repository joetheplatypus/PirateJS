import Camera from './Camera.js'

export default class GUI {
  constructor(params) {
    this.focus = params.focus
    GUI.list.push(this)
  }
  updatePos() {

  }
  updateFocus(focus) {
	  this.focus = focus
  }
  static updateAll() {
    GUI.list.map((gui) => {
      const newPos = Camera.absoluteToRelative(gui.focus)
      gui.updatePos(newPos)
    })
  }
}
GUI.list = []
GUI.showDist = 400;
