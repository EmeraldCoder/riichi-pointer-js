import { Triplet, Quad } from './../../combination-classes'
import { DragonTile } from './../../tile-classes'

/**
 * Dai Sangen (Big Three Dragons)<br><br>
 *
 * A hand with a triplet or quad of each type of dragon tile<br><br>
 *
 * Must be concealed: no<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class DaisangenYaku {
  /** @override */
  check ({ combinations }) {
    const nbOfDragonPonOrKan = combinations.filter(x => (x instanceof Triplet || x instanceof Quad) && x.tiles[0] instanceof DragonTile).length

    if (nbOfDragonPonOrKan === 3) return { key: 'daisangen', hanValue: 0, yakumanValue: 1 }
  }
}

export default DaisangenYaku
