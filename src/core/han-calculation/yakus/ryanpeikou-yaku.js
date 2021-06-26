import { Sequence } from './../../combinaison-classes'

/**
 * Ryanpeikou (twice pure double chiis) yaku pattern<br><br>
 *
 * Two pair of chiis, where each pair consists of two identical chiis.<br><br>
 *
 * Must be concealed: yes (some rules say no)<br>
 * Han: 3 (2 if open and the rule accept it)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class RyanpeikouYaku {
  /**
   * @param {Object} options - Configuration options for the yaku
   * @param {boolean} [options.allowOpen=true] - Flag indicating if the yaku is valid with an open hand (kuitan)
   */
  constructor (options) {
    this.allowOpen = options?.allowOpen ?? false
  }

  /** @override */
  check ({ combinaisons, isOpen }) {
    if (!this.allowOpen && isOpen) return

    const chiis = {}
    let nbPairOfChii = 0

    for (const combinaison of combinaisons) {
      if (combinaison instanceof Sequence) {
        const chiiKey = combinaison.tiles[0].suit + combinaison.tiles[0].number

        if (chiis[chiiKey] == null) { chiis[chiiKey] = 0 } else { nbPairOfChii++ }
      }
    }

    if (nbPairOfChii === 2) {
      return { key: 'ryanpeikou', hanValue: isOpen ? 2 : 3, yakumanValue: 0 }
    }
  }
}

export default RyanpeikouYaku
