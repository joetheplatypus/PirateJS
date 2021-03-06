const Entity = require('./Entity')
const GameObject = require('./GameObject')
const Ship = require('./Ship')
const StartupShip = require('./StartupShip')
const ExplorerShip = require('./ExplorerShip')
const TierOneShip = require('./TierOneShip')
const TradeRoute = require('./TradeRoute')
const Dock = require('./Dock')
const Item = require('./Item')

class Player extends GameObject {
  constructor(params) {
    super(params)
    
    this.socketId = params.socketId;
    this.name = params.name;
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
    this.ships.push(new ExplorerShip({x:this.island.x + 80,y:this.island.y - 50,parentID:this.id}))
    this.ships.push(new TierOneShip({x:this.island.x + 80,y:this.island.y + 270,parentID:this.id}))
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
  loadShip({islandID,shipID}) {
	  const island = GameObject.fromID(islandID)
	  const ship = GameObject.fromID(shipID)
	  if(island.loadable && island.canTradeWithPlayer(this.id) && ship.parentID === this.id) {
		  ship.load(island)
	  }
  }
  unloadShip(shipID) {
	  const ship = GameObject.fromID(shipID)
	  if(ship.parentID === this.id) {
		  ship.unload(this.island)
	  }
  }
  createDock(islandID) {
    const island = GameObject.fromID(islandID)
    if(!island.dock && island.ownerID === this.id && island.inventory.amountOfItem(Item.wood) > 300) {
      island.createDock()
    }
  }
  dockShip({dockID, shipID}) {
    const dock = GameObject.fromID(dockID)
    const ship = GameObject.fromID(shipID)
    if(ship.parentID !== this.id) {
      return
    }
    dock.dockShip(ship)
  }
  undockShip(dockID) {
    const dock = GameObject.fromID(dockID)
    if(dock.playerID !== this.id) {
      return
    }
    dock.undockShip()
  }
  repairShip(dockID) {
    const dock = GameObject.fromID(dockID)
    const ship = dock.dockedShip
    if(ship.parentID !== this.id) {
      return
    }
    dock.repairShip(ship)
  }
  upgradeShip(dockID) {
    const dock = GameObject.fromID(dockID)
    const ship = dock.dockedShip
    if(ship.parentID !== this.id) {
      return
    }
    dock.upgradeShip(ship)
  }
  createShip(dockID) {
    const dock = GameObject.fromID(dockID)
    if(dock.playerID !== this.id) {
      return
    }
    dock.createShip()
  }
  upgradeDock(dockID) {
    const dock = GameObject.fromID(dockID)
    if(dock.playerID !== this.id) {
      return
    }
    dock.upgrade()
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
      tradeRoutes: this.tradeRoutes,
      name: this.name
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
  static onConnect(socket, name) {
    const p = new Player({socketId:socket.id,name:name})
    const s = new StartupShip({x:100 + Math.random()*2000,y:100,parentID:p.id})
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

    socket.on('loadShip', ({islandID,shipID}) => {
      p.loadShip({islandID:islandID,shipID:shipID})
    })

    socket.on('unloadShip', (shipID) => {
      p.unloadShip(shipID)
    })

    socket.on('createDock', (islandID) => {
      p.createDock(islandID)
    })

    socket.on('dockShip', ({dock, ship}) => {
      p.dockShip({shipID:ship,dockID:dock})
    })

    socket.on('undockShip', (dock) => {
      p.undockShip(dock)
    })

    socket.on('upgradeShip', (dock) => {
      p.upgradeShip(dock)
    })

    socket.on('createShip', (dock) => {
      p.createShip(dock)
    })

    socket.on('repairShip', (dock) => {
      p.repairShip(dock)
    })

    socket.on('upgradeDock', (dock) => {
      p.upgradeDock(dock)
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
  static exists({ id }) {
    return GameObject.list.find((go) => go.id === id)
  }
  static nameTaken(username) {
    return false
  }
}
module.exports = Player