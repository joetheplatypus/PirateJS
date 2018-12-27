class Camera {
  constructor() {
    //top left of screen
    this.x = 0;
    this.y = 0;
    //middle of screen
    this.focusX = 0;
    this.focusY = 0;
    this.screenWidth = 0;
    this.screenHeight = 0;
  }
  setFocus(x,y) {
    this.focusX = x
    this.focusY = y

    this.x = this.focusX - this.screenWidth/2
    this.y = this.focusY - this.screenHeight/2
  }
  setScreenSize(width,height) {
    this.screenHeight = height;
    this.screenWidth = width;

    this.clampX -= this.screenWidth/2
    this.clampY -= this.screenHeight/2
  }
  getPos() {
    return {x:this.x,y:this.y}
  }
  absoluteToRelative({x,y}) {
    return {
      x: x-this.x,
      y: y-this.y
    }
  }
  relativeToAbsolute({x,y}) {
    return {
      x: x+this.x,
      y: y+this.y
    }
  }
  isOnScreen({x,y}) {
    if(x < this.x || y < this.y || x > this.x + this.screenWidth || y > this.y + this.screenHeight) {
      return false
    }
    return true
  }
}
export default new Camera();