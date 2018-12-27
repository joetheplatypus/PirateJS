const GameObject = require('./GameObject');

class Island extends GameObject {
  constructor(params) {
    super(params);
    this.ownerID = null
    this.className = 'Island'
    this.sendInitPack()
  }
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
      ownerID: this.ownerID
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      ownerID: this.ownerID
    }
  }
  setOwnerID(owner) {
    this.ownerID = owner
  }
}
module.exports = Island