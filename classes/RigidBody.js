const GameObject = require('./GameObject')

class RigidBody extends GameObject {
  constructor(params) {
    super(params)
    this.rigidBody = true
  }
}

module.exports = RigidBody