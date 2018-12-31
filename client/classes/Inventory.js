export default class Inventory {
	constructor(items) {
		this.items = items
  }
  update(items) {
    this.items = items
  }
	amountOfItem(item) {
		const ref = this.items.find((obj) => obj.item.name === item.name)
		if(ref) {
			return ref.amount
		} else {
			return 0
		}
	}
}