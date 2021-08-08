import { Sequence } from './../../combination-classes'
import { NumberedTile } from './../../tile-classes'

/**
 * Junchan or Junchan Taiyai or Junchan Tayao (terminals in all sets) yaku pattern<br><br>
 *
 * A hand with at least one sequence and where all sets and the pair contains terminals<br><br>
 *
 * Must be concealed: no<br>
 * Han: 3 (concealed) / 2 (open)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class JunchanYaku {
  /** @override */
  check ({ combinations, isOpen }) {
    let nbChii = 0

    for (const combination of combinations) {
      if (combination instanceof Sequence) nbChii++

      const nbTerminal = combination.tiles.reduce((agg, tile) => {
        if (tile instanceof NumberedTile && tile.isTerminal()) agg++
        return agg
      }, 0)

      if (nbTerminal === 0) return
    }

    if (nbChii > 0) return { key: 'junchan', hanValue: isOpen ? 2 : 3, yakumanValue: 0 }
  }
}

export default JunchanYaku
