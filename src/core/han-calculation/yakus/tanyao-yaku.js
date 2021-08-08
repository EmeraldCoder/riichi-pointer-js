import { HonorTile } from './../../tile-classes'

/**
 * Tanyao (all simples) yaku pattern<br><br>
 *
 * A hand consisting only of suit tiles 2-8 (without terminal or honor tiles)<br><br>
 *
 * Must be concealed : no (some rules say yes)<br>
 * Han : 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class TanyaoYaku {
  /**
   * @param {Object} options - Configuration options for the yaku
   * @param {boolean} [options.allowOpen=true] - Flag indicating if the yaku is valid with an open hand (kuitan)
   */
  constructor (options) {
    this.allowOpen = options?.allowOpen ?? true
  }

  /** @override */
  check ({ combinations, isOpen }) {
    if (!this.allowOpen && isOpen) return

    for (const combination of combinations) {
      for (const tile of combination.tiles) {
        if (tile instanceof HonorTile || tile.isTerminal()) return
      }
    }

    return { key: 'tanyao', hanValue: 1, yakumanValue: 0 }
  }
}

export default TanyaoYaku
