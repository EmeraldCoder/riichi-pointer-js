import { Triplet, Quad } from './../../combination-classes'

/**
 * San Ankou (3 concealed pons) yaku pattern<br><br>
 *
 * A hand with three concealed pons or kans.<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class SanankouYaku {
  /** @override */
  check ({ concealedCombinations, winningCombinationIndex, winningType }) {
    const nbAnkouOrAnkan = concealedCombinations.reduce((agg, combination, combinationIndex) => {
      if (
        (combination instanceof Triplet || combination instanceof Quad) &&
        (combinationIndex !== winningCombinationIndex || winningType === 'tsumo')
      ) {
        agg++
      }

      return agg
    }, 0)

    if (nbAnkouOrAnkan >= 3) return { key: 'sanankou', hanValue: 2, yakumanValue: 0 }
  }
}

export default SanankouYaku
