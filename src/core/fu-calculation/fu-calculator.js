/**
 * Base class for fu calculator implementations.<br/>
 * This class is intended to be used internally or to create custom fu calculator.<br><br>
 *
 * Contains the logic to process a list of rules to aggregate a fu total
 * rounded up to the tens (except in a few case like Chiitoitsu).<br><br>
 *
 * Real implementation, like WrcFuCalculator, would be better if you just want to get the fu value of a hand.
 *
 * @memberof FuCalculation
 */
class FuCalculator {
  /**
   * @param {FuCalculation.FuRule[]} rules - Set of rules to check during the fu calculation process
   */
  constructor (rules) {
    if (rules == null) throw new Error('rules parameter is required')

    this.rules = rules
  }

  /**
   * Calculate the fu value of a hand.
   *
   * @param {Hand} hand
   * @returns {FuCalculation.FuCalculationResult}
   */
  calculate (hand) {
    const context = { stop: false, rounding: true }
    const details = []

    for (const rule of this.rules) {
      const result = rule.check(hand, context)
      if (result) details.push(...normalizeDetails(result))
      if (context.stop) break
    }

    let total = details.reduce((agg, x) => agg + (x.quantity * x.fuValue), 0)

    if (context.rounding) total = Math.ceil(total / 10) * 10

    return { details, total }
  }
}

function normalizeDetails (result) {
  return result instanceof Array ? result : [result]
}

export default FuCalculator
