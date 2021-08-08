import { Quad } from './../../combination-classes'

/**
 * San Kantsu (3 kans) yaku pattern<br><br>
 *
 * A hand with three kans.<br><br>
 *
 * Must be concealed: no<br>
 * Han: 2
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class SankantsuYaku {
  /** @override */
  check ({ combinations }) {
    const nbKan = combinations.filter(x => x instanceof Quad).length
    if (nbKan === 3) return { key: 'sankantsu', hanValue: 2, yakumanValue: 0 }
  }
}

export default SankantsuYaku
