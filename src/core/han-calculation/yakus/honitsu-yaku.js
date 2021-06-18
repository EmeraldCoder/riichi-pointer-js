import { HonorTile } from './../../tile-classes'

/**
 * Honitsu (half flush) yaku pattern<br><br>
 *
 * A hand with tiles from only one suit plus honor tiles<br><br>
 *
 * Must be concealed: no<br>
 * Han: 3 (concealed) / 2 (open)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class HonitsuYaku {
  /** @override */
  check ({ combinaisons, isOpen }) {
    let nbHonorTile = 0
    let suit = null

    for (const combinaison of combinaisons) {
      for (const tile of combinaison.tiles) {
        if (tile instanceof HonorTile) {
          nbHonorTile++
        } else if (suit == null) {
          suit = tile.suit
        } else if (suit !== tile.suit) {
          return
        }
      }
    }

    if (nbHonorTile === 0) return // would be a chinitsu (full flush) instead

    return { key: 'honitsu', hanValue: isOpen ? 2 : 3, yakumanValue: 0 }
  }
}

export default HonitsuYaku
