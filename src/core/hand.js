class Hand {
  constructor (options) {
    this.concealedCombinations = options?.concealedCombinations ?? []
    this.openCombinations = options?.openCombinations ?? []

    this.winningType = options?.winningType ?? 'tsumo'
    this.seatWind = options?.seatWind ?? 'east'
    this.roundWind = options?.roundWind ?? 'east'

    this.winningCombinationIndex = options?.winningCombinationIndex ?? null
    this.winningTileIndex = options?.winningTileIndex ?? null

    this.nbDora = options?.nbDora ?? 0

    this.yakus = options?.yakus ?? []
  }

  get isOpen () {
    return this.openCombinations.length > 0
  }

  get combinations () {
    return this.concealedCombinations.concat(this.openCombinations)
  }

  get winningCombination () {
    if (this.winningCombinationIndex != null) {
      return this.concealedCombinations[this.winningCombinationIndex] ?? null
    }
    return null
  }

  get winningTile () {
    if (this.winningCombination != null && this.winningTileIndex != null) {
      return this.winningCombination.tiles[this.winningTileIndex] ?? null
    }
    return null
  }
}

export default Hand
