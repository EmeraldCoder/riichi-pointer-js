import { Pon, Kan } from './../../combinaison-classes'
import isTankiWait from './../../waits/is-tanki-wait'

/**
 * Suu Ankou (Four concealed pons)<br><br>
 *
 * A hand that has four closed pons/kans<br>
 * In the case of a single-tile wait for the pair, the tile can either be self-drawn or won from another player's discard, and it is worth two yakuman<br><br>
 *
 * Must be concealed: yes<br>
 * Yakuman: 1 (not single wait) / 2 (single wait)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class SuuankouYaku {
  constructor (options) {
    this.allowDoubleYakuman = options?.allowDoubleYakuman ?? false
  }

  /** @override */
  check (hand) {
    const nbOfConcealedPonOrKan = hand.concealedCombinaisons.filter((x, i) =>
      (x instanceof Pon || x instanceof Kan) &&
      (i !== hand.winningCombinaisonIndex || hand.winningType === 'tsumo')
    ).length

    if (nbOfConcealedPonOrKan === 4) {
      return { key: 'suuankou', hanValue: 0, yakumanValue: isTankiWait(hand) && this.allowDoubleYakuman ? 2 : 1 }
    }
  }
}

export default SuuankouYaku
