const Entity = require('./Entity');

class Ship extends Entity {
  constructor(params) {
    super(params);
    this.className = 'Ship'

    this.maxSpeed = 5;
    this.brakingForce = 0.12
    this.maxAcceleration = 0.03;
    this.maxRotationSpeed = 0.07;

    this.acceleration = 0;
    this.rotationSpeed = 0;

    this.input = {
      up: false,
      down: false,
      right: false,
      left: false,
    }


  }
  update() {
    //movement
    if(this.input.up && this.input.down) {
      if(this.speed > 0) {
        if(this.speed > this.brakingForce) {
          this.acceleration = -this.brakingForce
        } else {
          this.acceleration = -this.speed
        }
      } else if(this.speed < 0) {
        if(this.speed < -this.brakingForce) {
          this.acceleration = this.brakingForce
        } else {
          this.acceleration = -this.speed
        }
      } else {
        this.acceleration = 0
        this.speed = 0;
      }
    } else if(this.input.up) {
      if(this.speed < this.maxSpeed) {
        this.acceleration = this.maxAcceleration;
        if(this.speed < 0) {
          this.acceleration += this.brakingForce
        }
      } else if(this.speed > this.maxSpeed) {
        this.acceleration = -2*this.brakingForce
      } else { 
        this.acceleration = 0;
      }
    } else if(this.input.down) {
      if(this.speed > -this.maxSpeed) {
        this.acceleration = -this.maxAcceleration;
        if(this.speed > 0) {
          this.acceleration -= this.brakingForce
        }
      } else if(this.speed < -this.maxSpeed) {
        this.acceleration = 2*this.brakingForce
      } else {
        this.acceleration = 0;
      }
    } else {
      if(this.speed > 0) {
        if(this.speed > this.brakingForce) {
          this.acceleration = -this.brakingForce
        } else {
          this.acceleration = -this.speed
        }
      } else if(this.speed < 0) {
        if(this.speed < -this.brakingForce) {
          this.acceleration = this.brakingForce
        } else {
          this.acceleration = -this.speed
        }
      } else {
        this.acceleration = 0
        this.speed = 0;
      }
    }

    if(this.speed > 0) {
      if(this.input.left && this.input.right) {
        this.rotationSpeed = 0
      } else if(this.input.right) {
        this.rotationSpeed = this.maxRotationSpeed
      } else if(this.input.left) {
        this.rotationSpeed = -this.maxRotationSpeed
      } else {
        this.rotationSpeed = 0
      }
    } else if(this.speed < 0) {
      if(this.input.left && this.input.right) {
        this.rotationSpeed = 0
      } else if(this.input.right) {
        this.rotationSpeed = -this.maxRotationSpeed
      } else if(this.input.left) {
        this.rotationSpeed = this.maxRotationSpeed
      } else {
        this.rotationSpeed = 0
      }
    } else {
      this.rotationSpeed = 0
    }
    this.speed += this.acceleration
    this.rotation += this.rotationSpeed;

    super.update();
  }
  onDeath() {
    
  }
  setInput(input) {
    this.input.up = input.up
    this.input.down = input.down
    this.input.left = input.left
    this.input.right = input.right
  }
}
module.exports = Ship