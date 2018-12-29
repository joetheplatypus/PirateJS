import GUI from './GUI.js'
import DOM from './DOM.js'

export default class GUITextNode extends GUI {
  constructor(params) {
    super(params)
    this.div = document.createElement('div')
    this.textNode = document.createTextNode(params.text)
    this.div.appendChild(this.textNode)
	this.div.style.fontFamily = 'monospace'
    this.div.style.position = 'absolute'
    this.div.style.zIndex = 2
  }
  updatePos({x,y}) {
    this.div.style.top = y;
    this.div.style.left = x
  }
  hide() {
    if(DOM.UI.contains(this.div)) {
      DOM.UI.removeChild(this.div)
    }
  }
  show() {
    if(DOM.UI.contains(this.div)) {
      return 
    }
    DOM.UI.appendChild(this.div)
  }
  setText(text) {
    this.textNode.nodeValue = text
  }
}