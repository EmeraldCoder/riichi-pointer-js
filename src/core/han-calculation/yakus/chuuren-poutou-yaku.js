import { NumberedTile } from './../../tile-classes'

/**
 * Chuuren Poutou (Nine Gates)<br><br>
 *
 * A hand with (1-1-1-2-3-4-5-6-7-8-9-9-9) of the same suit and an other tile of the same suit<br>
 * Worth two yakuman if the hand was waiting on nine different tiles (Junsei Chuuren Poutou)<br><br>
 *
 * Must be concealed: yes<br>
 * Yakuman: 1 / 2 (Waiting on nine different tiles)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ChuurenPoutouYaku {
  constructor (options) {
    this.allowDoubleYakuman = options?.allowDoubleYakuman ?? false
  }

  /** @override */
  check ({ concealedCombinaisons, winningCombinaisonIndex, winningTileIndex }) {
    let suit = null

    const numbers = concealedCombinaisons.reduce((numbers, combinaison) => {
      combinaison.tiles.forEach(tile => {
        if (suit == null) suit = tile.suit

        if (tile.suit === suit && tile instanceof NumberedTile) {
          numbers[tile.number]++
        }
      })
      return numbers
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 })

    if (!containsAllChuurenPoutouNumbers(numbers)) return

    numbers[concealedCombinaisons[winningCombinaisonIndex].tiles[winningTileIndex].number]--

    const yakumanValue = containsAllChuurenPoutouNumbers(numbers) && this.allowDoubleYakuman ? 2 : 1

    return { key: 'chuuren poutou', hanValue: 0, yakumanValue }
  }
}

function containsAllChuurenPoutouNumbers (numbers) {
  return numbers[1] > 2 && numbers[9] > 2 && numbers[2] && numbers[3] && numbers[4] && numbers[5] && numbers[6] && numbers[7] && numbers[8]
}

export default ChuurenPoutouYaku
