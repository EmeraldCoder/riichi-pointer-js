import { Kan, Pon, Pair } from './combinaison-classes'
import { BambooTile, DragonTile, NumberedTile, HonorTile, WindTile } from './tile-classes'

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

/**
 * Ryuu Iisou (All Green)
 * A hand with only green tiles (2, 3, 4, 6, 8 of bamboo and green dragons)
 *
 * Must be concealed: no
 * Yakuman: 1
 */
export class RyuuIisou extends YakumanPattern {
  japaneseName = 'Ryuu Iisou'
  englishName = 'All Green'

  check (hand) {
    for (const combinaison of hand.combinaisons) {
      for (const tile of combinaison.tiles) {
        if (!(
          (tile instanceof DragonTile && tile.color === 'green') ||
          (tile instanceof BambooTile && [2, 3, 4, 6, 8].includes(tile.number))
        )) {
          return 0
        }
      }
    }

    return 1
  }
}

/**
 * Chin Routou (All Terminals)
 * A hand with only terminal tiles (1 and 9)
 *
 * Must be concealed: no
 * Yakuman: 1
 */
export class ChinRoutou extends YakumanPattern {
  japaneseName = 'Chin Routou'
  englishName = 'All Terminals'

  check (hand) {
    for (const combinaison of hand.combinaisons) {
      for (const tile of combinaison.tiles) {
        if (!(tile instanceof NumberedTile && tile.isTerminal())) {
          return 0
        }
      }
    }
    return 1
  }
}

/**
 * Tsuu Iisou (All Honors)
 * A hand with only honor tiles (dragons and winds)
 *
 * Must be concealed: no
 * Yakuman: 1
 */
export class TsuuIisou extends YakumanPattern {
  japaneseName = 'Tsuu Iisou'
  englishName = 'All Honors'

  check (hand) {
    for (const combinaison of hand.combinaisons) {
      for (const tile of combinaison.tiles) {
        if (!(tile instanceof HonorTile)) return 0
      }
    }
    return 1
  }
}

/**
 * Dai Sangen (Big Three Dragons)
 * A hand with a pon or kan of each type of dragon tile
 *
 * Must be concealed: no
 * Yakuman: 1
 */
export class DaiSangen extends YakumanPattern {
  japaneseName = 'Dai sangen'
  englishName = 'Big Three Dragons'

  check (hand) {
    const nbOfDragonPonOrKan = hand.combinaisons.filter(x => (x instanceof Pon || x instanceof Kan) && x.tiles[0] instanceof DragonTile).length
    return nbOfDragonPonOrKan === 3 ? 1 : 0
  }
}

/**
 * Shou Suushii (Little Four Winds)
 * A hand with three pon/kan of winds and a pair of the fourth wind
 *
 * Must be concealed: no
 * Yakuman: 1
 */
export class ShouSuushii extends YakumanPattern {
  japaneseName = 'Shou Suushii'
  englishName = 'Little Four Winds'

  check (hand) {
    const nbOfWindPonOrKan = hand.combinaisons.filter(x => (x instanceof Pon || x instanceof Kan) && x.tiles[0] instanceof WindTile).length
    const nbOfWindPair = hand.combinaisons.filter(x => x instanceof Pair && x.tiles[0] instanceof WindTile).length
    return nbOfWindPonOrKan === 3 && nbOfWindPair === 1 ? 1 : 0
  }
}

/**
 * Dai Suushii (Big Four Winds)
 * A hand with four pon/kan of winds
 *
 * Must be concealed: no
 * Yakuman: 2
 */
export class DaiSuushii extends YakumanPattern {
  japaneseName = 'Dai Suushii'
  englishName = 'Big Four Winds'

  check (hand) {
    const nbOfWindPonOrKan = hand.combinaisons.filter(x => (x instanceof Pon || x instanceof Kan) && x.tiles[0] instanceof WindTile).length
    return nbOfWindPonOrKan === 4 ? 2 : 0
  }
}
