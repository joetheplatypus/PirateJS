class Inventory {
	constructor() {
		this.items = []
	}
	addItem(item) {
		const ref = this.items.find((obj) => obj.item.name === item.name)
		if(ref) {
			ref.amount++
		} else {
			this.items.push({
				item: item,
				amount: 1
			})
		}
	}
	removeItem(item) {
		const ref = this.items.find((obj) => obj.item.name === item.name)
		if(ref) {
			if(ref.amount > 1) {
				ref.amount--;
			} else {
				this.items.splice(this.items.indexOf(ref),1)
			}
		} else {
			return;
		}
	}
}
module.exports = Inventory