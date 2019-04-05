import { Kan, Pon } from './combinaison-classes'

/**
 * Base class for the yakuman pattern classes
 */
class YakumanPattern { }

/**
 * Suu Ankou (Four concealed pons)
 * A hand that has four closed pons/kans
 * In the case of a single-tile wait for the pair, the tile can either be self-drawn or won from another player's discard, and it is worth two yakuman
 *
 * Must be concealed: yes
 * Yakuman: 1 (not single wait) / 2 (single wait)
 */
export class SuuAnkou extends YakumanPattern {
  japaneseName = 'Suu Ankou'
  englishName = 'Four concealed pon'

  check (hand) {
    const nbOfConcealedPon = hand.concealedCombinaisons.filter(x => x instanceof Pon || x instanceof Kan).length
    if (nbOfConcealedPon === 4) {
      return hand.isSingleWait() ? 2 : 1
    }
    return 0
  }
}

/**
 * Suu Kantsu (Four kans)
 * A hand with four kans, which can be open or concealed
 *
 * Must be concealed: no
 * Yakuman: 1
 */
export class SuuKantsu extends YakumanPattern {
  japaneseName = 'Suu Kantsu'
  englishName = 'Four kans'

  check (hand) {
    const nbOfKan = hand.combinaisons.filter(x => x instanceof Kan).length
    return nbOfKan === 4 ? 1 : 0
  }
}
