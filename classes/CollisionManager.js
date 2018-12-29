const RigidBody = require('./RigidBody')
const Ship = require('./Ship')
const Island = require('./Island')

module.exports = {
  rectInstersect(rect1,rect2) {
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y) {
       return true
   }
   return false
  },
  checkCollisions(list,broadDist,callback) {
    const rigidList = list.filter((item => item instanceof RigidBody))
    for(var i = 0; i < rigidList.length; i++) {
      let item1 = rigidList[i]
      let rect1 = item1.getBounds()
      for(var j = 1; j < (rigidList.length - i); j++) {
        let item2 = rigidList[i+j]
        let rect2 = item2.getBounds()
        if(this.distanceToPoint(rect1,rect2) > broadDist) {
          continue
        }
        if(this.rectInstersect(rect1, rect2)) {
          callback(item1, item2)
        }
      }
    }
  },
  rectifyCollision(item1,item2) {
    //console.log(item1.getBounds(), item2.getBounds())
    if(item1 instanceof Ship && item2 instanceof Island) {
      item1.speed = item1.speed / Math.abs(item1.speed) * -5
      //console.log(item1.acceleration)
    } else if(item2 instanceof Ship && item1 instanceof Island) {
      item2.speed = item2.speed / Math.abs(item2.speed) * -5
      //console.log(item2.acceleration)
    } else if(item1 instanceof Ship && item2 instanceof Ship) {
      item1.speed = item1.speed / Math.abs(item1.speed) * -5
      item2.speed =  item2.speed / Math.abs(item2.speed) * -5
    }

  },
  distanceToPoint(p1,p2) {
    return Math.sqrt(Math.pow(p2.x-p1.x, 2) + Math.pow(p2.y-p1.y, 2))
  }
}