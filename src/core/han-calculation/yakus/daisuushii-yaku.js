import { Triplet, Quad } from './../../combinaison-classes'
import { WindTile } from './../../tile-classes'

/**
 * Dai Suushii (Big Four Winds)<br><br>
 *
 * A hand with four triplet/quad of winds<br><br>
 *
 * Must be concealed: no<br>
 * Yakuman: 2
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class DaisuushiiYaku {
  constructor (options) {
    this.allowDoubleYakuman = options?.allowDoubleYakuman ?? false
  }

  /** @override */
  check ({ combinaisons }) {
    const nbOfWindPonOrKan = combinaisons.filter(x => (x instanceof Triplet || x instanceof Quad) && x.tiles[0] instanceof WindTile).length

    if (nbOfWindPonOrKan === 4) return { key: 'daisuushii', hanValue: 0, yakumanValue: this.allowDoubleYakuman ? 2 : 1 }
  }
}

export default DaisuushiiYaku
