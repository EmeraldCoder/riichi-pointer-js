import { Pair, Triplet, Quad } from './../../combination-classes'
import { DragonTile } from './../../tile-classes'

/**
 * Shou Sangen (little three dragons) yaku pattern<br><br>
 *
 * Two pons/kans of dragons plus one pair of dragons.<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ShousangenYaku {
  /** @override */
  check ({ combinations }) {
    const dragonCombinationCount = combinations.reduce((agg, combination) => {
      const tile = combination.tiles[0]

      if (tile instanceof DragonTile) {
        if (combination instanceof Pair) {
          agg.pair++
        } else if (combination instanceof Triplet || combination instanceof Quad) {
          agg.ponOrKan++
        }
      }

      return agg
    }, { pair: 0, ponOrKan: 0 })

    if (dragonCombinationCount.pair === 1 && dragonCombinationCount.ponOrKan === 2) {
      return { key: 'shousangen', hanValue: 2, yakumanValue: 0 }
    }
  }
}

export default ShousangenYaku
