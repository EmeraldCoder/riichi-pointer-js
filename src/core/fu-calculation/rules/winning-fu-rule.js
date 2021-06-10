/**
 * Fu calculation rule that will attribute a default value of 20 fu for winning a hand.
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class WinningFuRule {
  /** @override */
  check () {
    return { key: 'win', fuValue: 20, quantity: 1 }
  }
}

export default WinningFuRule
