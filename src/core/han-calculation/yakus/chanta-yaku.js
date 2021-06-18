import { Chii } from './../../combinaison-classes'
import { HonorTile } from './../../tile-classes'

/**
 * Chanta (outside hand) yaku pattern<br><br>
 *
 * A hand where all sets contain a terminal or honor tile, and at least one of the sets is a chii.<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2 (concealed) / 1 (open)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ChantaYaku {
  /** @override */
  check ({ combinaisons, isOpen }) {
    let nbChii = 0
    let nbHonorTile = 0

    for (const combinaison of combinaisons) {
      if (combinaison instanceof Chii) nbChii++

      const nbTerminalOrHonor = combinaison.tiles.reduce((agg, tile) => {
        if (tile instanceof HonorTile) {
          agg++
          nbHonorTile++
        } else if (tile.isTerminal()) {
          agg++
        }
        return agg
      }, 0)

      if (nbTerminalOrHonor === 0) return
    }

    // without chii it would be considered a honroutou or chinroutou
    // without honor tile it would be considered a junchan

    if (nbChii && nbHonorTile) {
      return { key: 'chanta', hanValue: isOpen ? 1 : 2, yakumanValue: 0 }
    }
  }
}

export default ChantaYaku
