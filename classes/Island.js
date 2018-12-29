const RigidBody = require('./RigidBody');

class Island extends RigidBody {
  constructor(params) {
    super(params);
    this.height = 118;
    this.width = 118;
  }
  getBounds() {
    return {
      x: this.x + 30,
      y: this.y + 30,
      height: this.height,
      width: this.width
    }
  }
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
    }
  }
}
module.exports = Island