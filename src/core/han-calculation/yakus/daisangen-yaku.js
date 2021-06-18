import { Pon, Kan } from './../../combinaison-classes'
import { DragonTile } from './../../tile-classes'

/**
 * Dai Sangen (Big Three Dragons)<br><br>
 *
 * A hand with a pon or kan of each type of dragon tile<br><br>
 *
 * Must be concealed: no<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class DaisangenYaku {
  /** @override */
  check ({ combinaisons }) {
    const nbOfDragonPonOrKan = combinaisons.filter(x => (x instanceof Pon || x instanceof Kan) && x.tiles[0] instanceof DragonTile).length

    if (nbOfDragonPonOrKan === 3) return { key: 'daisangen', hanValue: 0, yakumanValue: 1 }
  }
}

export default DaisangenYaku
