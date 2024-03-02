import { Sequence } from './../../combination-classes'

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
  check ({ combinations, isOpen }) {
    if (!this.allowOpen && isOpen) return

    const groupsOfIdenticalSequence = combinations.filter(combination => combination instanceof Sequence).reduce((agg, combination) => {
      const key = combination.tiles[0].number + combination.tiles[0].suit
      const index = agg.findIndex(x => x.key === key)
      if (index === -1) {
        agg.push({ key, items: [combination] })
      } else {
        agg[index].items.push(combination)
      }
      return agg
    }, [])

    if (groupsOfIdenticalSequence.filter(x => x.items.length > 1).length === 2) {
      return { key: 'ryanpeikou', hanValue: isOpen ? 2 : 3, yakumanValue: 0 }
    }
  }
}

export default RyanpeikouYaku
