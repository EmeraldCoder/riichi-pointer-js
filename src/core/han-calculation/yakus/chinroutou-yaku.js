import { NumberedTile } from './../../tile-classes'

/**
 * Chin Routou (All Terminals)<br><br>
 *
 * A hand with only terminal tiles (1 and 9)<br><br>
 *
 * Must be concealed: no<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ChinroutouYaku {
  /** @override */
  check ({ combinaisons }) {
    for (const combinaison of combinaisons) {
      for (const tile of combinaison.tiles) {
        if (!(tile instanceof NumberedTile && tile.isTerminal())) {
          return
        }
      }
    }

    return { key: 'chinroutou', hanValue: 0, yakumanValue: 1 }
  }
}

export default ChinroutouYaku
