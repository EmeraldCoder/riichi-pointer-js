import { Pair, Pon, Kan } from './../../combinaison-classes'
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
  check ({ combinaisons }) {
    const dragonCombinaisonCount = combinaisons.reduce((agg, combinaison) => {
      const tile = combinaison.tiles[0]

      if (tile instanceof DragonTile) {
        if (combinaison instanceof Pair) {
          agg.pair++
        } else if (combinaison instanceof Pon || combinaison instanceof Kan) {
          agg.ponOrKan++
        }
      }

      return agg
    }, { pair: 0, ponOrKan: 0 })

    if (dragonCombinaisonCount.pair === 1 && dragonCombinaisonCount.ponOrKan === 2) {
      return { key: 'shousangen', hanValue: 2, yakumanValue: 0 }
    }
  }
}

export default ShousangenYaku
