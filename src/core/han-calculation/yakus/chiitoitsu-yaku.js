import { Pair } from './../../combination-classes'

/**
 * Chiitoitsu (seven pairs) yaku pattern<br><br>
 *
 * A hand consisting of seven pairs<br><br>
 *
 * Must be concealed: yes<br>
 * Han: 2
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ChiitoitsuYaku {
  /** @override */
  check ({ concealedCombinations }) {
    const nbPair = concealedCombinations.reduce((agg, combination) => {
      if (combination instanceof Pair) agg++
      return agg
    }, 0)

    if (nbPair === 7) return { key: 'chiitoitsu', hanValue: 2, yakumanValue: 0 }
  }
}

export default ChiitoitsuYaku
