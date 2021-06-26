import { Sequence } from './../../combinaison-classes'

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
  check ({ combinaisons, isOpen }) {
    if (isOpen) return

    const storedChiis = []
    let numberOfIdenticalChiis = 0

    for (const combinaison of combinaisons) {
      if (combinaison instanceof Sequence) {
        const identicalChiis = storedChiis.filter(x => x.tiles[0].suit === combinaison.tiles[0].suit && x.tiles[0].value === combinaison.tiles[0].value)
        if (identicalChiis.length > 0) numberOfIdenticalChiis++
        storedChiis.push(combinaison)
      }
    }

    if (numberOfIdenticalChiis === 1) return { key: 'iipeikou', hanValue: 1, yakumanValue: 0 }
  }
}

export default IipeikouYaku
