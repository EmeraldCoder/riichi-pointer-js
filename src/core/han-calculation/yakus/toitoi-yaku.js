import { Pon, Kan } from './../../combinaison-classes'

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
  check ({ combinaisons }) {
    const nbPonOrKan = combinaisons.reduce((agg, combinaison) => {
      if (combinaison instanceof Pon || combinaison instanceof Kan) agg++
      return agg
    }, 0)

    if (nbPonOrKan === 4) return { key: 'toitoi', hanValue: 2, yakumanValue: 0 }
  }
}

export default ToitoiYaku
