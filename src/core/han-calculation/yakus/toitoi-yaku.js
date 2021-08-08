import { Triplet, Quad } from './../../combination-classes'

/**
 * Toitoi (all pons) yaku pattern<br><br>

 * A hand with four pons/kans and one pair.<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ToitoiYaku {
  /** @override */
  check ({ combinations }) {
    const nbPonOrKan = combinations.reduce((agg, combination) => {
      if (combination instanceof Triplet || combination instanceof Quad) agg++
      return agg
    }, 0)

    if (nbPonOrKan === 4) return { key: 'toitoi', hanValue: 2, yakumanValue: 0 }
  }
}

export default ToitoiYaku
