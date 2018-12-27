const Entity = require('./Entity')
const GameObject = require('./GameObject')
const Ship = require('./Ship')
const StartupShip = require('./StartupShip')
const ExplorerShip = require('./ExplorerShip')
const WoodShip = require('./WoodShip')
const TradeRoute = require('./TradeRoute')

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
	this.tradeRoutes = [];

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
	if(!island.claimable) {
		return
	}
    island.setOwnerID(this.id)
    this.island = island
	
	//replace startup ship with explorer
	const {x,y} = this.ships[0]
	GameObject.remove(this.ships[0])
	this.ships = []
	this.ships.push(new ExplorerShip({x:x,y:y,parentID:this.id}))
	this.ships.push(new WoodShip({x:x+100,y:y+100,parentID:this.id}))
	this.setShipControl(0)
  }
  openTradeRoute(islandID) {
	  const island = GameObject.fromID(islandID)
	  if(!island) {
		  return
	  }
	  const route = new TradeRoute(island, this.id, this.island)
	  this.tradeRoutes.push(route)
	  island.tradeRoutes.push(route)
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
	  if(state) {
		  if(this.ships.indexOf(this.controlling) + 1 === this.ships.length) {
			this.setShipControl(0)
		  } else {
			this.setShipControl(this.ships.indexOf(this.controlling) + 1)
		  }
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
	  tradeRoutes: this.tradeRoutes
    }
  }
  getUpdatePack() {
    return {
      id:this.id,
      controllingID: this.controlling.id,
      ships:this.ships,
      island: this.island,
	  tradeRoutes: this.tradeRoutes
    }
  }
  static onConnect(socket) {
    const p = new Player({socketId:socket.id})
    const s = new StartupShip({x:100,y:100,parentID:p.id})
    p.ships.push(s)
    p.setShipControl(p.ships.indexOf(s))

    console.log(`Player ${p.name} has joined the game`)

    //data packs

    socket.on('keyPress',(data) => {
      p.handleInput(data)
    })

    socket.on('claimIsland',(islandID) => {
      p.claimIsland(islandID)
    })
	
	socket.on('openTradeRoute',(islandID) => {
		p.openTradeRoute(islandID)
	})

    socket.emit('selfId', p.id)
    socket.emit('init', GameObject.getAllInitPacks());
  }
  static onDisconnect({ id }) {
    const p = GameObject.fromSocketID(id)
	//remove ships
	Ship.removeAllOwnedByPlayer(p.id)
	
    GameObject.remove(GameObject.fromSocketID(id))
    console.log(`Player ${p.name} has left the game`)
  }
}
module.exports = Player