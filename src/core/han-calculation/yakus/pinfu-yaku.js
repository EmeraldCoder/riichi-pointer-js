import { Pair, Sequence } from './../../combinaison-classes'
import { DragonTile, WindTile } from './../../tile-classes'
import isTankiWait from './../../waits/is-tanki-wait'
import isKanchanWait from './../../waits/is-kanchan-wait'
import isPenchanWait from './../../waits/is-penchan-wait'

/**
 * Pinfu (All sequence / No points) yaku pattern<br><br>
 *
 * A hand with no fu except the one for winning<br>
 * Just sequence, no pair point (dragon or seat/prevalent wind) and a two-sided wait (only wait that give no fu)<br><br>
 *
 * Must be concealed: yes<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class PinfuYaku {
  /** @override */
  check (hand) {
    if (
      hand.isOpen ||
      isTankiWait(hand) ||
      isKanchanWait(hand) ||
      isPenchanWait(hand)
    ) return

    const pairs = hand.concealedCombinaisons.filter(x => x instanceof Pair)
    const chiis = hand.concealedCombinaisons.filter(x => x instanceof Sequence)

    if (pairs.length !== 1 || chiis.length !== 4) return

    const pairTile = pairs[0].tiles[0]

    if (
      pairTile instanceof DragonTile ||
      (pairTile instanceof WindTile && (pairTile.value === hand.roundWind || pairTile.value === hand.seatWind))
    ) return

    return { key: 'pinfu', hanValue: 1, yakumanValue: 0 }
  }
}

export default PinfuYaku
