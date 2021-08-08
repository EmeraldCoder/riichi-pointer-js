import { Sequence } from './../../combination-classes'

/**
 * San Shoku Doujun (mixed triple sequence) yaku pattern<br><br>
 *
 * Three chiis of the same value, with one in each suit<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2 (concealed) / 1 (open)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class SanshokuDoujunYaku {
  /** @override */
  check ({ combinations, isOpen }) {
    const chiiCount = {}

    for (const combination of combinations) {
      if (combination instanceof Sequence) {
        const tile = combination.tiles[0]

        if (chiiCount[tile.number] == null) {
          chiiCount[tile.number] = { dot: 0, bamboo: 0, character: 0 }
        }

        const count = chiiCount[tile.number]

        count[tile.suit]++

        if (count.dot && count.bamboo && count.character) {
          return { key: 'sanshoku doujun', hanValue: isOpen ? 1 : 2, yakumanValue: 0 }
        }
      }
    }
  }
}

export default SanshokuDoujunYaku
