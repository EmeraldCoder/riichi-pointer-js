import { Chii } from './../../combinaison-classes'

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
  check ({ combinaisons, isOpen }) {
    const chiiCount = {}

    for (const combinaison of combinaisons) {
      if (combinaison instanceof Chii) {
        var tile = combinaison.tiles[0]

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
