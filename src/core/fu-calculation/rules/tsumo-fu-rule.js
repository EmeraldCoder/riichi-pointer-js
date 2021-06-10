/**
 * Fu calculation rule that will attribute 2 fu if the hand was won by tsumo.<br><br>
 *
 * Depending of the ruleset, some hands with certain yaku are not eligible. In most ruleset, this is the case for hands with a pinfu yaku.<br><br>
 *
 * There is also some ruleset that exclude hands won with Rinshan Kaihou.
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class TsumoFuRule {
  /**
   * @param {Object} options - Configuration options for the rule
   * @param {YakuPattern[]} [options.excludedYakuPatterns=[]] - Yaku patterns excluded from getting the fu from this rule.
   * (usually Pinfu, but can also be Rinshan Kaihou)
   */
  constructor (options) {
    this.excludedYakuPatterns = options?.excludedYakuPatterns ?? []
  }

  /** @override */
  check (hand) {
    let excluded = false

    for (const yakuPattern of this.excludedYakuPatterns) {
      if (yakuPattern.check(hand)) {
        excluded = true
        break
      }
    }

    if (!excluded && hand.winningType === 'tsumo') {
      return { key: 'tsumo', fuValue: 2, quantity: 1 }
    }
  }
}

export default TsumoFuRule
