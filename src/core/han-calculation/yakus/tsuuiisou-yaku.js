import { HonorTile } from './../../tile-classes'

/**
 * Tsuu Iisou (All Honors)<br><br>
 *
 * A hand with only honor tiles (dragons and winds)<br><br>
 *
 * Must be concealed: no<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class TsuuiisouYaku {
  /** @override */
  check ({ combinaisons }) {
    for (const combinaison of combinaisons) {
      for (const tile of combinaison.tiles) {
        if (!(tile instanceof HonorTile)) return
      }
    }

    return { key: 'tsuuiisou', hanValue: 0, yakumanValue: 1 }
  }
}

export default TsuuiisouYaku
