class GameObject {
  constructor(params) {
    this.id = Math.random();
    this.x = params.x;
    this.y = params.y;
    this.vx = params.vx || 0;
    this.vy = params.vy || 0;
    this.maxSpeed = params.maxSpeed || 0;
    this.speed = 0;
    this.rotation = params.rotation || 0;
    this.className = 'GameObject'
    GameObject.list.push(this)
  }
  update() {
    this.vx = this.speed * Math.cos(this.rotation)
    this.vy = this.speed * Math.sin(this.rotation)

    this.x += this.vx;
    this.y += this.vy;
  }
  sendInitPack() {
    GameObject.initPack.push(this.getInitPack())
  }
  getInitPack() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      className: this.className
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
  getDistanceToPoint({x,y}) {
    return Math.sqrt(Math.pow(x-this.x,2) + Math.pow(y-this.y,2))
  }
  static remove(object) {
    const id = object.id
    GameObject.removePack.push(id);
    GameObject.list.splice(GameObject.list.indexOf(object), 1)
  }
  static updateAll() {
    GameObject.list.map((go)=>{
      go.update();
    })
  }
  static getFrameUpdateData() {
    const updatePack = GameObject.list.map(go => go.getUpdatePack());
    const packs =  {
      init: GameObject.initPack,
      update: updatePack,
      remove: GameObject.removePack,
    }

    GameObject.initPack = [];
    GameObject.removePack = [];

    return packs

  }
  static getAllInitPacks() {
    return GameObject.list.map(obj => obj.getInitPack())
  }
  static fromSocketID(id) {
    return GameObject.list.find(obj => obj.socketId == id)
  }
  static fromID(id) {
    return GameObject.list.find(obj => obj.id == id)
  }
  static getInstancesOf(theClass) {
	  return GameObject.list.filter(go => go instanceof theClass)
  }
  static getNearestInstanceOf(theClass, {x,y}) {
	  let nearest = null
	  for(var i = 0; i < GameObject.list.length; i++) {
		  if(GameObject.list[i] instanceof theClass) {
			  if(!nearest) {
				  nearest = GameObject.list[i]
				  continue
			  }
			  if(GameObject.list[i].getDistanceToPoint({x:x,y:y}) < nearest.getDistanceToPoint({x:x,y:y})) {
				  nearest = GameObject.list[i]
			  }
		  }
		  
	  }
	  return nearest
  }
}
GameObject.initPack = [];
GameObject.removePack = [];
GameObject.list = [];
module.exports = GameObject;