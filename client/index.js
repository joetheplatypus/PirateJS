//classes
import Render from './classes/Render.js'
import Player from './classes/Player.js'
import GameObject from './classes/GameObject.js'
import Camera from './classes/Camera.js'
import Ship from './classes/Ship.js'
import StartupShip from './classes/StartupShip.js'
import Island from './classes/Island.js';
import GUI from './classes/GUI.js';

const classMap = new Map([['Player', Player],['Ship', Ship],['Island', Island],['StartupShip', StartupShip]])

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
}

document.onkeydown = function(event) {
  if(event.keyCode === 68) { // D
    socket.emit('keyPress', {inputId:'right',state:true});
  } else if(event.keyCode === 83) { //S
    socket.emit('keyPress', {inputId:'down',state:true});
  } else if(event.keyCode === 65) { //A
    socket.emit('keyPress', {inputId:'left',state:true});
  } else if(event.keyCode === 87) { //W
    socket.emit('keyPress', {inputId:'up',state:true});
  } else if(event.keyCode === 32) { //SPACEBAR
    socket.emit('keyPress', {inputId:'space',state:true});
  } else if(event.keyCode === 69) { //E
    socket.emit('keyPress', {inputId:'use',state:true});
  }
}

document.onkeyup = function(event) {
  if(event.keyCode === 68) { // D
    socket.emit('keyPress', {inputId:'right',state:false});
  } else if(event.keyCode === 83) { //S
    socket.emit('keyPress', {inputId:'down',state:false});
  } else if(event.keyCode === 65) { //A
    socket.emit('keyPress', {inputId:'left',state:false});
  } else if(event.keyCode === 87) { //W
    socket.emit('keyPress', {inputId:'up',state:false});
  } else if(event.keyCode === 32) { //SPACEBAR
    socket.emit('keyPress', {inputId:'space',state:false});
  } else if(event.keyCode === 69) { //E
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