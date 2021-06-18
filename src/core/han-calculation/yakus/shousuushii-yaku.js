import { Pon, Kan, Pair } from './../../combinaison-classes'
import { WindTile } from './../../tile-classes'

/**
 * Shou Suushii (Little Four Winds)<br><br>
 *
 * A hand with three pon/kan of winds and a pair of the fourth wind<br><br>
 *
 * Must be concealed: no<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ShousuushiiYaku {
  /** @override */
  check ({ combinaisons }) {
    const nbOfWindPonOrKan = combinaisons.filter(x => (x instanceof Pon || x instanceof Kan) && x.tiles[0] instanceof WindTile).length
    const nbOfWindPair = combinaisons.filter(x => x instanceof Pair && x.tiles[0] instanceof WindTile).length

    if (nbOfWindPonOrKan === 3 && nbOfWindPair === 1) {
      return { key: 'shousuushii', hanValue: 0, yakumanValue: 1 }
    }
  }
}

export default ShousuushiiYaku
