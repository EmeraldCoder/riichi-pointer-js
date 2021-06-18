import { HonorTile } from './../../tile-classes'

/**
 * Chinitsu (full flush) yaku pattern<br><br>
 *
 * A hand with tiles from only one suit<br><br>
 *
 * Must be concealed: no<br>
 * Han: 6 (concealed) / 5 (open)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ChinitsuYaku {
  /** @override */
  check ({ combinaisons, isOpen }) {
    let suit = null

    for (const combinaison of combinaisons) {
      for (const tile of combinaison.tiles) {
        if (tile instanceof HonorTile) return

        if (suit == null) {
          suit = tile.suit
        } else if (suit !== tile.suit) {
          return
        }
      }
    }

    return { key: 'chinitsu', hanValue: isOpen ? 5 : 6, yakumanValue: 0 }
  }
}

export default ChinitsuYaku
