import { Chii } from './../../combinaison-classes'
import { NumberedTile } from './../../tile-classes'

/**
 * Junchan or Junchan Taiyai or Junchan Tayao (terminals in all sets) yaku pattern<br><br>
 *
 * A hand with at least one chii and where all sets and the pair contains terminals<br><br>
 *
 * Must be concealed: no<br>
 * Han: 3 (concealed) / 2 (open)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class JunchanYaku {
  /** @override */
  check ({ combinaisons, isOpen }) {
    let nbChii = 0

    for (const combinaison of combinaisons) {
      if (combinaison instanceof Chii) nbChii++

      const nbTerminal = combinaison.tiles.reduce((agg, tile) => {
        if (tile instanceof NumberedTile && tile.isTerminal()) agg++
        return agg
      }, 0)

      if (nbTerminal === 0) return
    }

    if (nbChii > 0) return { key: 'junchan', hanValue: isOpen ? 2 : 3, yakumanValue: 0 }
  }
}

export default JunchanYaku
