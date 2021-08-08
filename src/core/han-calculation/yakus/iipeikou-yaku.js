import { Sequence } from './../../combination-classes'

/**
 * Iipeikou (pure double sequence) yaku pattern<br><br>
 *
 * Two chiis of the same value and suit<br><br>
 *
 * Must be concealed: yes<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class IipeikouYaku {
  /** @override */
  check ({ combinations, isOpen }) {
    if (isOpen) return

    const storedChiis = []
    let numberOfIdenticalChiis = 0

    for (const combination of combinations) {
      if (combination instanceof Sequence) {
        const identicalChiis = storedChiis.filter(x => x.tiles[0].suit === combination.tiles[0].suit && x.tiles[0].value === combination.tiles[0].value)
        if (identicalChiis.length > 0) numberOfIdenticalChiis++
        storedChiis.push(combination)
      }
    }

    if (numberOfIdenticalChiis === 1) return { key: 'iipeikou', hanValue: 1, yakumanValue: 0 }
  }
}

export default IipeikouYaku
