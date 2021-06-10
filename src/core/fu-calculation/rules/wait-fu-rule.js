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
    if (hand.isSingleWait() || hand.isClosedWait() || hand.isEdgeWait()) {
      return { key: 'wait', fuValue: 2, quantity: 1 }
    }
  }
}

export default WaitFuRule
