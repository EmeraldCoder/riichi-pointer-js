import { DragonTile, BambooTile } from './../../tile-classes'

/**
 * Ryuu Iisou (All Green)<br><br>
 *
 * A hand with only green tiles (2, 3, 4, 6, 8 of bamboo and green dragons)<br><br>
 *
 * Must be concealed: no<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class RyuuiisouYaku {
  /** @override */
  check ({ combinaisons }) {
    for (const combinaison of combinaisons) {
      for (const tile of combinaison.tiles) {
        if (!(
          (tile instanceof DragonTile && tile.color === 'green') ||
          (tile instanceof BambooTile && [2, 3, 4, 6, 8].includes(tile.number))
        )) {
          return
        }
      }
    }

    return { key: 'ryuuiisou', hanValue: 0, yakumanValue: 1 }
  }
}

export default RyuuiisouYaku
