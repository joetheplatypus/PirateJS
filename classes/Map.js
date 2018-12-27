const Island = require('./Island')

module.exports = {
  tileWidth: 400,
  tileHeight: 400,
  tileSize: 32,
  chunkSize: 20,
  chunkWidth: 400 / 20,
  chunkHeight: 400 / 20,
  width: this.tileWidth * this.tileSize,
  height: this.tileHeight * this.tileSize,
  generateIslands() {
    for(var i = 0; i < this.chunkHeight; i++) {
      this.islandMap.push(new Array(this.chunkWidth))
      for(var j = 0; j < this.chunkWidth; j++) {
        const island = new Island({
          x: (j*this.chunkSize + Math.random()*this.chunkSize)*this.tileSize,
          y: (i*this.chunkSize + Math.random()*this.chunkSize)*this.tileSize
        })
        this.islandMap[i][j] = island
      }
    }
  },
  islandMap: []
}