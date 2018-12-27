import Camera from './Camera.js'
import DOM from './DOM.js'
import Player from './Player.js'

export default {
  hoverDist: 130,
  ships: document.getElementById('ui-ships'),
  layer: document.getElementById('UI'),
  updateShips(_ships) {
    if(this.ships.innerHTML !== _ships.length) {
      this.ships.innerHTML = _ships.length
    }
  },
  hover: {
    guis: [],
    createClaimGUI(island) {
      const {x,y} = Camera.absoluteToRelative(island)
      const button = document.createElement('button')
      button.gameData = {
        island: island
      }
      button.innerText = 'Claim Island'
      button.style.zIndex = 2
      button.style.position = 'absolute'
      button.style.top = y
      button.style.left = x
      button.onclick = (event) => {
        Player.socket.emit('claimIsland', island.id)
      }
      button.style.padding = '5px'
      button.focus = {x:island.x,y:island.y};
      DOM.UI.appendChild(button)
      this.guis.push(button)
    },
    createText(msg, focusX, focusY) {
      const {x,y} = Camera.absoluteToRelative({x:focusX, y:focusY})
      const div = document.createElement('div')
      const text = document.createTextNode(msg)
      div.appendChild(text)
      div.style.zIndex = 2
      div.style.position = 'absolute'
      div.style.top = y
      div.style.left = x
      div.focus = {x:focusX.x,y:focusY};
      DOM.UI.appendChild(div)
      this.guis.push(div)
    },
    updateAll() {
      this.guis.map((gui) => {
        const newPos = Camera.absoluteToRelative(gui.focus)
        gui.style.top = newPos.y + 10;
        gui.style.left = newPos.x - 10
      })
    },
    clearHover() {
      if(DOM.UI) {
        DOM.UI.innerHTML = ''
        this.guis = []
      }
    }
  },
  
}