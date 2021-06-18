import { Pon, Kan } from './../../combinaison-classes'

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
  check ({ concealedCombinaisons, winningCombinaisonIndex, winningType }) {
    const nbAnkouOrAnkan = concealedCombinaisons.reduce((agg, combinaison, combinaisonIndex) => {
      if (
        (combinaison instanceof Pon || combinaison instanceof Kan) &&
        (combinaisonIndex !== winningCombinaisonIndex || winningType === 'tsumo')
      ) {
        agg++
      }

      return agg
    }, 0)

    if (nbAnkouOrAnkan >= 3) return { key: 'sanankou', hanValue: 2, yakumanValue: 0 }
  }
}

export default SanankouYaku
