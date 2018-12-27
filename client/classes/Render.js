import Camera from './Camera.js'

const render =  {
  ctx: null,
  tileSize: 64,
  totalCheckPoints: 0,
  setCTX(_ctx) {
    this.ctx = _ctx
  },
  images: {
    spritesheet: new Image(),
    tilesheet: new Image(),
    car: new Image(),
    flag: new Image(),
    sprites: new Map([
      ['cannon',[88,422, 29, 16]],
      ['explorerShip',[628,166,16,26]],
      ['startupShip',[408,0,66,113]],
      ['woodShip',[408,0,66,113]],
    ]),
    tiles: new Map([
      ['islandTopLeft',[0,0]],
      ['islandTopMiddle',[64,0]],
      ['islandTopRight',[128,0]],
      ['islandMidLeft',[0,64]],
      ['islandMidMiddle',[64,64]],
      ['islandMidRight',[128,64]],
      ['islandBottomLeft',[0,128]],
      ['islandBottomMiddle',[64,128]],
      ['islandBottomRight',[128,128]],
      ])

  },
  drawImg(x,y,rot,image,centre) {
    const cameraPos = Camera.getPos();
    this.ctx.save()
    this.ctx.translate(Math.floor(x-cameraPos.x), Math.floor(y-cameraPos.y))
    this.ctx.rotate(rot)
    if(centre) {
      this.ctx.translate(Math.floor(-image.width/2), Math.floor(-image.height/2))
    }
    this.ctx.drawImage(image, 0, 0)
    this.ctx.restore()
  },
  drawSpritesheetImage(x,y,rot,imageRef, centre) {
    const cameraPos = Camera.getPos();
    const image = this.images.sprites.get(imageRef)
    this.ctx.save()
    this.ctx.translate(Math.floor(x-cameraPos.x), Math.floor(y-cameraPos.y))
    this.ctx.rotate(rot)
    if(centre) {
      this.ctx.translate(-image[2]/2, -image[3]/2)
    }
    this.ctx.drawImage(this.images.spritesheet, image[0], image[1], image[2], image[3], 0, 0, image[2], image[3])
    this.ctx.restore()
  },
  drawTilesheetImage(x,y,rot,imageNum, centre) {
    const cameraPos = Camera.getPos();
    const image = this.images.tiles.get(imageNum)
    this.ctx.save()
    this.ctx.translate(Math.floor(x-cameraPos.x), Math.floor(y-cameraPos.y))
    this.ctx.rotate(rot)
    if(centre) {
      this.ctx.translate(-32, -32)
    }
    this.ctx.drawImage(this.images.tilesheet, image[0], image[1], 64, 64, 0, 0, 64, 64)
    this.ctx.restore()
  },
}
render.images.spritesheet.src = '/client/img/spritesheet.png'
render.images.tilesheet.src = '/client/img/tilesheet.png'

export default render;