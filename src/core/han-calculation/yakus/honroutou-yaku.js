import { HonorTile } from './../../tile-classes'

/**
 * Honroutou (all terminals & honors) yaku pattern<br><br>
 *
 * A hand consisting of only terminals and honors<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class HonroutouYaku {
  /** @override */
  check ({ combinations }) {
    for (const combination of combinations) {
      for (const tile of combination.tiles) {
        if (!(tile instanceof HonorTile || tile.isTerminal())) return
      }
    }

    return { key: 'honroutou', hanValue: 2, yakumanValue: 0 }
  }
}

export default HonroutouYaku
