import isTankiWait from './../../waits/is-tanki-wait'
import isKanchanWait from './../../waits/is-kanchan-wait'
import isPenchanWait from './../../waits/is-penchan-wait'

/**
 * Fu calculation rule that will attribute fu according to the hand's wait.<br><br>
 *
 * If the hand was waiting on only one tile, single wait (tanki), closed wait (kanchan) or edge wait (penchan), it is worth 2 fu.<br>
 *
 * Other waits are worth nothing.
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class WaitFuRule {
  /** @override */
  check (hand) {
    if (isTankiWait(hand) || isKanchanWait(hand) || isPenchanWait(hand)) {
      return { key: 'wait', fuValue: 2, quantity: 1 }
    }
  }
}

export default WaitFuRule
