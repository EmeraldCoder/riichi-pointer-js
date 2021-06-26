import { Quad } from './../../combinaison-classes'

/**
 * Suu Kantsu (Four kans)<br><br>
 *
 * A hand with four kans, which can be open or concealed<br><br>
 *
 * Must be concealed: no<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class SuukantsuYaku {
  /** @override */
  check ({ combinaisons }) {
    const nbOfKan = combinaisons.filter(x => x instanceof Quad).length
    if (nbOfKan === 4) return { key: 'suukantsu', hanValue: 0, yakumanValue: 1 }
  }
}

export default SuukantsuYaku
