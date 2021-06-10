/**
 * Fu calculation rule that will attribute a fixed amount of fu (usually 25) for hands with chiitoitsu (seven pairs).<br><br>
 *
 * As an exception, the fu value of the hand is not rounded up to the tens because it is worth of fixed amount.<br><br>
 *
 * Some rules say seven pairs has 50 fu and one han, especially in the Kansai region.<br>
 * https://en.wikipedia.org/wiki/Japanese_Mahjong_scoring_rules#Steps_of_calculation
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class ChiitoitsuFuRule {
  /**
   * @param {Object} options - Configuration options for the rule
   * @param {YakuPattern} options.chiitoitsuYakuPattern - Yaku pattern to validate the hand shape
   * @param {number} [options.fuValue=25] - Amount of fu to add if the rule is valid
   */
  constructor (options) {
    if (options?.chiitoitsuYakuPattern == null) throw new Error('chiitoitsuYakuPattern is required')

    this.chiitoitsuYakuPattern = options.chiitoitsuYakuPattern
    this.fuValue = options?.fuValue ?? 25
  }

  /** @override */
  check (hand, context) {
    if (this.chiitoitsuYakuPattern.check(hand)) {
      // tell the calculator to stop processing the other rules
      // and to not round up the total because this hand is always worth a fixed amount of fu.
      context.stop = true
      context.rounding = false
      return { key: 'chiitoitsu', fuValue: this.fuValue, quantity: 1 }
    }
  }
}

export default ChiitoitsuFuRule
