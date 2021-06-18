/**
 * Fu calculation rule that will attribute 10 fu for concealed hands won by ron.
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class ClosedRonFuRule {
  /** @override */
  check ({ isOpen, winningType }) {
    if (!isOpen && winningType === 'ron') {
      return { key: 'closed ron', fuValue: 10, quantity: 1 }
    }
  }
}

export default ClosedRonFuRule
