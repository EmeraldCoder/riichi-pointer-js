import { Pair, Sequence } from './../../combinaison-classes'
import { DragonTile } from './../../tile-classes'
import isTankiWait from './../../waits/is-tanki-wait'
import isKanchanWait from './../../waits/is-kanchan-wait'
import isPenchanWait from './../../waits/is-penchan-wait'

/**
 * Fu calculation rule that will attribute fu if the hand was open and won by ron without any fu for the pair, the combinaisons and the wait.
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class OpenPinfuFuRule {
  /** @override */
  check (hand) {
    if (hand.winningType === 'ron' && hand.isOpen) {
      const chiis = hand.combinaisons.filter(x => x instanceof Sequence)
      const pairs = hand.concealedCombinaisons.filter(x => x instanceof Pair)

      if (
        chiis.length === 4 &&
        pairs.length === 1 &&

        !(pairs[0].tiles[0] instanceof DragonTile) &&
        pairs[0].tiles[0].value !== hand.roundWind &&
        pairs[0].tiles[0].value !== hand.seatWind &&

        !isTankiWait(hand) &&
        !isKanchanWait(hand) &&
        !isPenchanWait(hand)
      ) {
        return { key: 'open pinfu', fuValue: 10, quantity: 1 }
      }
    }
  }
}

export default OpenPinfuFuRule
