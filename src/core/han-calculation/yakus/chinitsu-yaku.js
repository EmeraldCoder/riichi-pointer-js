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
  check ({ combinations, isOpen }) {
    let suit = null

    for (const combination of combinations) {
      for (const tile of combination.tiles) {
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
