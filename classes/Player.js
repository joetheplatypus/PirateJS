const Entity = require('./Entity')
const GameObject = require('./GameObject')
const Ship = require('./Ship')
const StartupShip = require('./StartupShip')
const Island = require('./Island')

class Player extends GameObject {
  constructor(params) {
    super(params)
    
    this.socketId = params.socketId;
    this.name = `${this.id}`;
    this.input = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
    }
    this.controlling = {id:null}
    this.ships = []
    this.island = null;

    this.className = 'Player'
    this.p = null
    this.sendInitPack();
    
  }
  
  update() {
    //send input to controlling object
    if(this.controlling.id) {
      this.controlling.setInput(this.input)
    }
    super.update()
  }
  setShipControl(index) {
    this.controlling = this.ships[index]
  }
  claimIsland(islandID) {
    if(this.island) {
      return
    }
    const island = GameObject.fromID(islandID)
    island.setOwnerID(this.id)
    this.island = island
  }
  handleInput({ inputId, state }) {
    if(inputId == 'up') {
      this.input.up = state
    }
    if(inputId == 'down') {
      this.input.down = state
    }
    if(inputId == 'right') {
      this.input.right = state
    }
    if(inputId == 'left') {
      this.input.left = state
    }
    if(inputId == 'space') {
      this.input.space = state
    }
    if(inputId == 'use') {
      this.input.use = state
      if(this.ships.indexOf(this.controlling) + 1 === this.ships.length) {
        this.setShipControl(0)
      } else {
        this.setShipControl(this.ships.indexOf(this.controlling) + 1)
      }
      
    }
  }
  getInitPack() {
    return {
      name:this.name,
      id:this.id,
      className:this.className,
      controllingID: this.controlling.id,
      ships: this.ships,
      island: this.island,
    }
  }
  getUpdatePack() {
    return {
      id:this.id,
      controllingID: this.controlling.id,
      ships:this.ships,
      island: this.island,
    }
  }
  static onConnect(socket) {
    const p = new Player({socketId:socket.id})
    const s = new StartupShip({x:100,y:100})
    p.ships.push(s)
    p.setShipControl(p.ships.indexOf(s))
    //const i = new Island({x:200,y:200})

    console.log(`Player ${p.name} has joined the game`)

    //data packs

    socket.on('keyPress',(data) => {
      p.handleInput(data)
    })

    socket.on('claimIsland',(islandID) => {
      p.claimIsland(islandID)
    })

    socket.emit('selfId', p.id)
    socket.emit('init', GameObject.getAllInitPacks());
  }
  static onDisconnect({ id }) {
    const p = GameObject.fromSocketID(id)
    GameObject.remove(GameObject.fromSocketID(id))
    console.log(`Player ${p.name} has left the game`)
  }
}
module.exports = Player