import { Sequence } from './../../combination-classes'

/**
 * Ittsu or Ikkitsuukan (pure straight) yaku pattern<br><br>
 *
 * Three consecutive chiis (1-9) in the same suit<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2 (concealed) / 1 (open)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class IttsuuYaku {
  /** @override */
  check ({ combinations, isOpen }) {
    const chiiCount = {}

    for (const combination of combinations) {
      if (combination instanceof Sequence) {
        const tile = combination.tiles[0]

        if (chiiCount[tile.suit] == null) {
          chiiCount[tile.suit] = { 1: 0, 4: 0, 7: 0 }
        }

        const count = chiiCount[tile.suit]

        count[tile.number]++

        if (count[1] && count[4] && count[7]) {
          return { key: 'ittsuu', hanValue: isOpen ? 1 : 2, yakumanValue: 0 }
        }
      }
    }
  }
}

export default IttsuuYaku
