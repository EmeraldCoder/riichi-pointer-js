/**
 * Base class for han calculator implementations.<br/>
 * This class is intended to be used internally or to create custom han calculator.<br><br>
 *
 * Contains the logic to process a list of yaku to aggregate a han or yakuman total<br><br>
 *
 * Real implementation, like WrcHanCalculator, would be better if you just want to get the han or yakuman value of a hand.
 *
 * @memberof HanCalculation
 */
class HanCalculator {
  /**
   * @param {HanCalculation.Yaku[]} yakus - Set of yaku to check during the han calculation process
   */
  constructor (yakus, options) {
    if (yakus == null) throw new Error('yakus parameter is required')

    this.yakus = yakus
    this.stackableYakuman = options?.stackableYakuman ?? false
  }

  /**
   * Calculate the han value of a hand.
   *
   * @param {Hand} hand
   * @returns {HanCalculation.HanCalculationResult}
   */
  calculate (hand) {
    const details = []

    // process the hand for each yaku

    for (const yaku of this.yakus) {
      const result = yaku.check(hand)
      if (result) details.push(...normalizeDetails(result))
    }

    // sum the yakuman value of the hand and return early if it's higher than 0
    // because we don't need the han value if it's a yakuman hand

    const yakumanDetails = details.filter(x => x.yakumanValue != null && x.yakumanValue > 0)

    if (yakumanDetails.length > 0) {
      let yakuman = 0

      if (this.stackableYakuman) {
        yakuman = sum(yakumanDetails.map(x => x.yakumanValue))
      } else {
        // take the value of the yakuman with the highest value
        yakuman = Math.max(...yakumanDetails.map(x => x.yakumanValue))
      }

      return { details: details.filter(x => x.yakumanValue != null && x.yakumanValue > 0), han: null, yakuman }
    }

    // if it's not a yakuman hand
    // sum the han value of the hand

    let han = sum(details.map(x => x.hanValue))

    // add the number of dora to the han value of the hand only if the hand have
    // already some valid yaku

    if (han > 0 && hand.nbDora > 0) {
      han += hand.nbDora
      details.push({ key: 'dora', hanValue: hand.nbDora, yakumanValue: 0 })
    }

    return { details, han: han > 0 ? han : null, yakuman: null }
  }
}

function sum (array) {
  return array.reduce((agg, x) => {
    if (x != null) agg += x
    return agg
  }, 0)
}

function normalizeDetails (result) {
  return result instanceof Array ? result : [result]
}

export default HanCalculator
