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
	removeItems(item,amount) {
		for(var i = 0; i < amount; i++) {
			this.removeItem(item)
		}
	}
	hasItem(item) {
		const ref = this.items.find((obj) => obj.item.name === item.name)
		if(ref) {
			return true
		} else {
			return false
		}
	}
}
module.exports = Inventory