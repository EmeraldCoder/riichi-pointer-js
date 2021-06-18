class Hand {
  constructor (options) {
    this.concealedCombinaisons = options?.concealedCombinaisons ?? []
    this.openCombinaisons = options?.openCombinaisons ?? []

    this.winningType = options?.winningType ?? 'tsumo'
    this.seatWind = options?.seatWind ?? 'east'
    this.roundWind = options?.roundWind ?? 'east'

    this.winningCombinaisonIndex = options?.winningCombinaisonIndex ?? null
    this.winningTileIndex = options?.winningTileIndex ?? null

    this.nbDora = options?.nbDora ?? 0

    this.yakus = options?.yakus ?? []
  }

  get isOpen () {
    return this.openCombinaisons.length > 0
  }

  get combinaisons () {
    return this.concealedCombinaisons.concat(this.openCombinaisons)
  }

  get winningCombinaison () {
    if (this.winningCombinaisonIndex != null) {
      return this.concealedCombinaisons[this.winningCombinaisonIndex] ?? null
    }
    return null
  }

  get winningTile () {
    if (this.winningCombinaison != null && this.winningTileIndex != null) {
      return this.winningCombinaison.tiles[this.winningTileIndex] ?? null
    }
    return null
  }
}

export default Hand
