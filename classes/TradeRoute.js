class TradeRoute {
	constructor(island, playerID, playerIsland) {
		this.playerID = playerID
		this.playerIslandID = playerIsland.ID
		this.tradingIslandID = island.id
		this.cargoType = island.resourceType
	}
}

module.exports = TradeRoute