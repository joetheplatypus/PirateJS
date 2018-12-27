const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});

//Classes
const Settings = require('./settings')
const GameObject = require('./classes/GameObject')
const Player = require('./classes/Player')
const Map = require('./classes/Map')

//Web Server
//serve client index page on index
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/client/index.html')
})
//serve client assets on static web server
app.use('/client',express.static(__dirname + '/client'))

server.listen(Settings.port);
console.log(`Server started on port ${Settings.port}`)

//Socket IO setup
let SOCKET_LIST = [];

io.sockets.on('connection',(socket)=>{
  SOCKET_LIST.push(socket)
  socket.id = SOCKET_LIST.indexOf(socket)

  //setup events
  socket.on('disconnect',()=>{
    Player.onDisconnect(socket)
  })

  //initialise player
  Player.onConnect(socket)

})

Map.generateIslands()


//Game Loop
setInterval(()=>{
  GameObject.updateAll();
  const dataPacks = GameObject.getFrameUpdateData();
  SOCKET_LIST.map((socket)=>{
    socket.emit('init', dataPacks.init)
    socket.emit('update', dataPacks.update)
    socket.emit('remove', dataPacks.remove)
  })
},1000/Settings.tickRate)