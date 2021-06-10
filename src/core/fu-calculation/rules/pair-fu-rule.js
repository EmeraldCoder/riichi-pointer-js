import { Pair } from './../../combinaison-classes'
import { DragonTile } from './../../tile-classes'

/**
 * Fu calculation rule that will attribute fu according to the hand's pair.<br><br>
 *
 * If the hand's pair is of tiles that would score yakuhai in a koutsu, then this scores 2 fu.
 * If the pair doubles up as both the round wind and the seat wind, it may score 2 fu, or 4 fu.
 * That is dependent on which scoring rule is used for this case.<br>
 * http://arcturus.su/wiki/Fu
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class PairFuRule {
  /**
   * @param {Object} options - Configuration options for the rule
   * @param {boolean} [options.stackable=true] - Flag indicating if we can stack the fu for the round wind and seat wind
   */
  constructor (options) {
    this.stackable = options?.stackable ?? true
  }

  /** @override */
  check ({ concealedCombinaisons, roundWind, seatWind }) {
    const pairs = concealedCombinaisons.filter(x => x instanceof Pair)

    if (pairs.length !== 1) return

    const tile = pairs[0].tiles[0]

    if (
      tile instanceof DragonTile ||
      tile.value === roundWind ||
      tile.value === seatWind
    ) {
      let quantity = 1

      if (this.stackable && tile.value === roundWind && tile.value === seatWind) {
        quantity++
      }

      return { key: 'pair', fuValue: 2, quantity }
    }
  }
}

export default PairFuRule
