import GUI from './GUI.js'

export default class GameObject {
  constructor(params) {
    this.id = params.id;
    this.x = params.x;
    this.y = params.y;
    this.hover = false
    this.rotation = params.rotation
    GameObject.list.push(this);
  }
  draw() {
    
  }
  onHover() {

  }
  update(params) {
    this.x = params.x
    this.y = params.y
    this.rotation = params.rotation
  }
  getDistanceToPoint({x,y}) {
    return Math.sqrt(Math.pow(x-this.x,2) + Math.pow(y-this.y,2))
  }
  static updateObject(object) {
    GameObject.fromID(object.id).update(object)
  }
  static drawAll() {
    GameObject.list.map(go => go.draw())
  }
  static fromID(id) {
    return GameObject.list.find(go => go.id == id)
  }
  static remove(id) {
    const obj = GameObject.fromID(id);
    const index = GameObject.list.indexOf(obj);
    GameObject.list.splice(index, 1)
  }
  static mouseHoverCheck(coords) {
    const go = GameObject.list.find(go => (Math.abs(go.x - coords.x) < GUI.hoverDist && Math.abs(go.y - coords.y) < GUI.hoverDist))
    if(!go) {
      //GameObject.setAllHoverFalse()
    } else if(!go.hover) {
      go.hover = true
      go.onHover();
    }
  }
  static setAllHoverFalse() {
    GameObject.list.map((go) => {
      go.hover = false
      if(go.showGUI) {
        go.showGUI = false
      }
    })
    GUI.hover.clearHover()
  }
}
GameObject.list = []