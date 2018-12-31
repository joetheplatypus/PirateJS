//classes
import Render from './classes/Render.js'
import Player from './classes/Player.js'
import GameObject from './classes/GameObject.js'
import Camera from './classes/Camera.js'
import Ship from './classes/Ship.js'
import StartupShip from './classes/StartupShip.js'
import ExplorerShip from './classes/ExplorerShip.js'
import TierOneShip from './classes/TierOneShip.js'
import TierTwoShip from './classes/TierTwoShip.js'
import PlayerIsland from './classes/PlayerIsland.js';
import WoodIsland from './classes/WoodIsland.js';
import Dock from './classes/Dock.js';
import GUI from './classes/GUI.js';
import StoneIsland from './classes/StoneIsland.js';

const classMap = new Map([['Player', Player],['Ship', Ship],['PlayerIsland', PlayerIsland],['WoodIsland', WoodIsland],['StartupShip', StartupShip],['ExplorerShip', ExplorerShip],['TierOneShip', TierOneShip],['TierTwoShip', TierTwoShip],['Dock',Dock],['StoneIsland', StoneIsland]])

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

//signing in
let inGame = false

document.getElementById('signInJoin').onclick = function () {
  const username = document.getElementById('signDiv-username').value;
  socket.emit('signIn', {username:username});
}

socket.on('signInResponse', function(data) {
  if(data.success) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'inline-block';
    inGame = true
  } else {
    var box = document.getElementById("loginMessage");
    box.innerHTML = "The username " + data.name + " is already taken";
  }
});

//Data Packs

socket.on('selfId',(id) => {
  Player.selfID = id;
  socket.id = Player.selfID;
  Player.socket = socket
});

socket.on('init',(data) => {
  if(!inGame) {
    return
  }
  data.map((obj) => {
    if(!GameObject.fromID(obj.id)) {
		
      let classToInstantiate = classMap.get(obj.className);
      new classToInstantiate(obj)
    }
  })
})

socket.on('update',(data) => {
  if(!inGame) {
    return
  }
  data.map((obj) => {
    GameObject.updateObject(obj)
  })
})

socket.on('remove',(data) => {
  if(!inGame) {
    return
  }
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
  if(!inGame) {
    return
  }
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
  if(!inGame) {
    return
  }
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
  if(!inGame) {
    return
  }
  const coords = Camera.relativeToAbsolute({x:event.clientX,y:event.clientY})
  GameObject.mouseHoverCheck(coords)
}


//Game Loop
function loop(ts) {
  if(inGame) {
    Render.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    Render.ctx.fillStyle = 'lightblue'
    Render.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    GameObject.drawAll();
    GUI.updateAll()
  }
  


  requestAnimationFrame(loop)
}

loop();