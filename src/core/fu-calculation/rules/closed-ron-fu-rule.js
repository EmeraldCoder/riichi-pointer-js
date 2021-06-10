/**
 * Fu calculation rule that will attribute 10 fu for concealed hands won by ron.
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class ClosedRonFuRule {
  /** @override */
  check ({ openCombinaisons, winningType }) {
    if (openCombinaisons.length === 0 && winningType === 'ron') {
      return { key: 'closed ron', fuValue: 10, quantity: 1 }
    }
  }
}

export default ClosedRonFuRule
