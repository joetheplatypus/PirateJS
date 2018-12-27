//classes
import Render from './classes/Render.js'
import Player from './classes/Player.js'
import GameObject from './classes/GameObject.js'
import Camera from './classes/Camera.js'
import Ship from './classes/Ship.js'
import StartupShip from './classes/StartupShip.js'
import ExplorerShip from './classes/ExplorerShip.js'
import WoodShip from './classes/WoodShip.js'
import PlayerIsland from './classes/PlayerIsland.js';
import WoodIsland from './classes/WoodIsland.js';
import GUI from './classes/GUI.js';

const classMap = new Map([['Player', Player],['Ship', Ship],['PlayerIsland', PlayerIsland],['WoodIsland', WoodIsland],['StartupShip', StartupShip],['ExplorerShip', ExplorerShip],['WoodShip', WoodShip]])

//Socket Setup
const socket = io();

//canvas
const canvas = document.getElementById('gameCanvas');
const uiLayer = document.getElementById('UI');
window.addEventListener('resize',resize,false);
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  Camera.setScreenSize(canvas.width,canvas.height)
}
resize()
Render.setCTX(canvas.getContext('2d'))

//Data Packs

socket.on('selfId',(id) => {
  Player.selfID = id;
  socket.id = Player.selfID;
  Player.socket = socket
});

socket.on('init',(data) => {
  data.map((obj) => {
    if(!GameObject.fromID(obj.id)) {
		
      let classToInstantiate = classMap.get(obj.className);
      new classToInstantiate(obj)
    }
  })
})

socket.on('update',(data) => {
  data.map((obj) => {
    GameObject.updateObject(obj)
  })
})

socket.on('remove',(data) => {
  data.map((id) => {
    GameObject.remove(id)
  })
})

socket.on('map',(map) => {
  WorldMap.load(map)
})

//User Input
const input = {
  right: false,
  left: false,
  up: false,
  down: false,
  space: false,
  use: false,
}

document.onkeydown = function(event) {
  if(event.keyCode === 68 && !input.right) { // D
	input.right = true;
    socket.emit('keyPress', {inputId:'right',state:true});
  } else if(event.keyCode === 83 && !input.down) { //S
	input.down = true
    socket.emit('keyPress', {inputId:'down',state:true});
  } else if(event.keyCode === 65 && !input.left) { //A
	input.left = true
    socket.emit('keyPress', {inputId:'left',state:true});
  } else if(event.keyCode === 87 && !input.up) { //W
	input.up = true
    socket.emit('keyPress', {inputId:'up',state:true});
  } else if(event.keyCode === 32 && !input.space) { //SPACEBAR
	input.space = true
    socket.emit('keyPress', {inputId:'space',state:true});
  } else if(event.keyCode === 69 && !input.use) { //E
	input.use = true
    socket.emit('keyPress', {inputId:'use',state:true});
  }
}

document.onkeyup = function(event) {
  if(event.keyCode === 68 && input.right) { // D
	input.right = false
    socket.emit('keyPress', {inputId:'right',state:false});
  } else if(event.keyCode === 83 && input.down) { //S
	input.down = false
    socket.emit('keyPress', {inputId:'down',state:false});
  } else if(event.keyCode === 65 && input.left) { //A
	input.left = false
    socket.emit('keyPress', {inputId:'left',state:false});
  } else if(event.keyCode === 87 && input.up) { //W
	input.up = false
    socket.emit('keyPress', {inputId:'up',state:false});
  } else if(event.keyCode === 32 && input.space) { //SPACEBAR
	input.space = false
    socket.emit('keyPress', {inputId:'space',state:false});
  } else if(event.keyCode === 69 && input.use) { //E
	input.use = false
    socket.emit('keyPress', {inputId:'use',state:false});
  }
}

document.onmousemove = (event) => {
  const coords = Camera.relativeToAbsolute({x:event.clientX,y:event.clientY})
  GameObject.mouseHoverCheck(coords)
}


//Game Loop
function loop(ts) {
  Render.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  Render.ctx.fillStyle = 'lightblue'
  Render.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  GameObject.drawAll();
  GUI.updateAll()


  requestAnimationFrame(loop)
}

loop();