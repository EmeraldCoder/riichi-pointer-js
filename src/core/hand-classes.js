import { Pair, Chii, Orphan } from './combinaison-classes'

/**
 * Hand class
 *
 * param Array<HandCombinaison> concealedCombinaisons
 * param Array<HandCombinaison> openCombinaisons
 * param String seatWind
 * param String roundWind
 * param Integer winningCombinaisonIndex
 * param Integer winningTileIndex
 * param string winningType
 * param string winningSecondType
 */
export function Hand (concealedCombinaisons, openCombinaisons, seatWind, roundWind, winningCombinaisonIndex, winningTileIndex, winningType, winningSecondType, doraTiles, uraDoraTiles) {
  this.concealedCombinaisons = concealedCombinaisons // array of HandCombinaison
  this.openCombinaisons = openCombinaisons // array of HandCombinaison
  this.combinaisons = concealedCombinaisons.concat(this.openCombinaisons)
  this.seatWind = seatWind
  this.roundWind = roundWind
  this.winningCombinaisonIndex = winningCombinaisonIndex
  this.winningTileIndex = winningTileIndex
  this.winningType = winningType
  this.winningSecondType = winningSecondType
  this.isRiichi = false
  this.isDoubleRiichi = false
  this.isIppatsu = false
  this.doraTiles = doraTiles
  this.uraDoraTiles = uraDoraTiles

  this.isFinish = function () {
    var nbPair = 0
    var nbCombinaison = 0
    var nbOrphan = 0

    for (var i = 0; i < this.combinaisons.length; i++) {
      var combinaison = this.combinaisons[i]
      if (combinaison instanceof Pair) {
        nbPair++
      } else if (combinaison instanceof Orphan) {
        nbOrphan++
      } else {
        nbCombinaison++
      }
    }

    if (nbPair === 1 && nbCombinaison === 4) {
      return true
    }
    if (nbPair === 7 && nbCombinaison === 0) {
      return true
    }
    if (nbOrphan === 12 && nbPair === 1) {
      return true
    }

    return false
  }

  this.isTwoSidedWait = function () {
    if (this.winningCombinaisonIndex !== undefined && this.winningTileIndex !== undefined) {
      var combinaison = this.combinaisons[this.winningCombinaisonIndex]
      if (combinaison instanceof Chii) {
        if (this.winningTileIndex !== 1 && !this.isEdgeWait()) {
          return true
        }
      }
    }
    return false
  }

  this.isEdgeWait = function () {
    if (this.winningCombinaisonIndex !== undefined && this.winningTileIndex !== undefined) {
      var combinaison = this.combinaisons[this.winningCombinaisonIndex]
      var tile = combinaison.tiles[this.winningTileIndex]
      if (combinaison instanceof Chii) {
        if (this.winningTileIndex === 0 && tile.number === 7) return true
        if (this.winningTileIndex === 2 && tile.number === 3) return true
      }
    }
    return false
  }

  this.isClosedWait = function () {
    if (this.winningCombinaisonIndex !== undefined && this.winningTileIndex !== undefined) {
      var combinaison = this.combinaisons[this.winningCombinaisonIndex]
      if (combinaison instanceof Chii) {
        if (this.winningTileIndex === 1) return true
      }
    }
    return false
  }

  this.isSingleWait = function () {
    if (this.winningCombinaisonIndex !== undefined && this.winningTileIndex !== undefined) {
      var combinaison = this.combinaisons[this.winningCombinaisonIndex]
      if (combinaison instanceof Pair) return true
    }
    return false
  }
}
