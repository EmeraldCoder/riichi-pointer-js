import { Pair, Orphan } from './../../combinaison-classes'
import { HonorTile } from './../../tile-classes'

/**
 * Kokushi Musou (Thirteen Orphans)<br><br>
 *
 * A hand with one of each dragon, wind and 1 and 9 of each suit, plus an other tile to make a pair<br>
 * Worth two yakuman if the hand was waiting on 13 different tiles (Kokushi Musou 13 men machi)<br><br>
 *
 * Must be concealed: yes<br>
 * Yakuman: 1 / 2 (Waiting on 13 different tiles)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class KokushiMusouYaku {
  constructor (options) {
    this.allowDoubleYakuman = options?.allowDoubleYakuman ?? false
  }

  /** @override */
  check ({ concealedCombinaisons, winningCombinaison }) {
    const nbOfPair = concealedCombinaisons.filter(x => x instanceof Pair).length
    if (nbOfPair === 0) return

    const nbOfOrphan = concealedCombinaisons.filter(x => x instanceof Orphan).length
    if (nbOfOrphan !== 12) return

    const nbOfValidDistinctTile = concealedCombinaisons.reduce((tiles, combinaison) => {
      combinaison.tiles.forEach(tile => tiles.push(tile))
      return tiles
    }, [])
      .filter(tile => tile instanceof HonorTile || tile.isTerminal())
      .map(tile => `${tile.suit}.${tile.value}`)
      .filter((key, index, keys) => keys.indexOf(key) === index)
      .length

    if (nbOfValidDistinctTile !== 13) return

    const yakumanValue = winningCombinaison instanceof Pair && this.allowDoubleYakuman ? 2 : 1

    return { key: 'kokushi musou', hanValue: 0, yakumanValue }
  }
}

export default KokushiMusouYaku
