import { Triplet, Quad } from './../../combination-classes'
import { NumberedTile } from './../../tile-classes'

/**
 * San Shoku Doukou (triple triplet) yaku pattern<br><br>
 *
 * One triplet or quad in each of the three suits, all having the same number.<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class SanshokuDokouYaku {
  /** @override */
  check (hand) {
    const storedPons = {}

    for (const combination of hand.combinations) {
      if (combination instanceof Triplet || combination instanceof Quad) {
        const tile = combination.tiles[0]

        if (tile instanceof NumberedTile) {
          if (storedPons[tile.number] == null) storedPons[tile.number] = 0

          storedPons[tile.number]++

          if (storedPons[tile.number] === 3) return { key: 'sanshoku doukou', hanValue: 2, yakumanValue: 0 }
        }
      }
    }
  }
}

export default SanshokuDokouYaku
