import GameObject from './GameObject.js'

export default class Entity extends GameObject{
  constructor(params) {
    super(params)
    this.health = params.health;
    this.maxHealth = params.maxHealth;
  }
  update(params) {
    super.update(params)
    this.health = params.health
  }
  draw() {

  }
}