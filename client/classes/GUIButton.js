import GUI from './GUI.js'
import DOM from './DOM.js'

export default class GUIButton extends GUI {
  constructor(params) {
    super(params)
    this.button = document.createElement('button')
    this.button.innerText = params.text
    this.button.style.position = 'absolute'
    this.button.style.zIndex = 2
    this.button.onclick = params.onclick
    this.button.style.padding = '5px'
  }
  updatePos({x,y}) {
    this.button.style.top = y + 15;
    this.button.style.left = x + 7;
  }
  hide() {
    if(DOM.UI.contains(this.button)) {
      DOM.UI.removeChild(this.button)
    }
  }
  show() {
    if(DOM.UI.contains(this.button)) {
      return 
    }
    DOM.UI.appendChild(this.button)
  }
  setText(text) {
    this.button.innerText = text
  }
  enable() {
    this.button.className = ''
  }
  disable() {
    this.button.className = 'disabled'
  }
}