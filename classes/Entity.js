const RigidBody = require('./RigidBody');

class Entity extends RigidBody {
  constructor(params) {
    super(params);
    this.maxHealth = params.maxHealth || 100;
    this.health = this.maxHealth;
  }
  update() {
    super.update();
  }
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
      maxHealth: this.maxHealth,
      health: this.health,
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      health: this.health,
    }
  }
  takeDamage(damage) {
    this.health -= damage;
    if(this.health <= 0) {
      this.health = 0;
      this.onDeath();
    }
  }
  onDeath() {

  }

}

module.exports = Entity;