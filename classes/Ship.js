const Entity = require('./Entity');
const GameObject = require('./GameObject')

class Ship extends Entity {
  constructor(params) {
    super(params);
    this.className = 'Ship'

    this.maxSpeed = 5;
    this.brakingForce = 0.12
    this.maxAcceleration = 0.03;
    this.maxRotationSpeed = 0.07;
    this.docked = false

    this.acceleration = 0;
    this.rotationSpeed = 0;

    this.width = 45
    this.height = 45

    this.input = {
      up: false,
      down: false,
      right: false,
      left: false,
    }
	
	this.parentID = params.parentID


  }
  update() {
    if(this.docked) {
      return
    }
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
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className,
      maxHealth: this.maxHealth,
      health: this.health,
      docked: this.docked,
      width: this.width,
		  height: this.height
    }
  }
  getUpdatePack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      health: this.health,
      docked: this.docked
    }
  }
  onDeath() {
    
  }
  load(island) {

  }
  unload(island) {

  }
  setInput(input) {
    this.input.up = input.up
    this.input.down = input.down
    this.input.left = input.left
    this.input.right = input.right
  }
  static removeAllOwnedByPlayer(id) {
    //console.log(GameObject.list.find(go => go.className === 'WoodShip'))
	  for(var i = 0; i < GameObject.list.length; i++) {
      if(GameObject.list[i].className == "TierOneShip") {
       // console.log(GameObject.list[i])
      }
		  if(!(GameObject.list[i] instanceof Ship)) {
        //console.log(GameObject.list[i].className)
			  continue;
		  } else {
        //console.log(GameObject.list[i].className)
      }
		  if(GameObject.list[i].parentID === id) {
			  GameObject.remove(GameObject.list[i])
		  }
	  }
  }
}
module.exports = Ship