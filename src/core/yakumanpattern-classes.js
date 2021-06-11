import { Kan, Pon, Pair, Orphan } from './combinaison-classes'
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
    const nbOfConcealedPon = hand.concealedCombinaisons.filter((x, i) =>
      (x instanceof Pon || x instanceof Kan) &&
      (i !== hand.winningCombinaisonIndex || hand.winningType === 'tsumo')
    ).length
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

/**
 * Chuuren Poutou (Nine Gates)
 * A hand with (1-1-1-2-3-4-5-6-7-8-9-9-9) of the same suit and an other tile of the same suit
 * Worth two yakuman if the hand was waiting on nine different tiles (Junsei Chuuren Poutou)
 *
 * Must be concealed: yes
 * Yakuman: 1 / 2 (Waiting on nine different tiles)
 */
export class ChuurenPoutou extends YakumanPattern {
  japaneseName = 'Chuuren Poutou'
  englishName = 'Nine Gates'

  check (hand) {
    const numbers = hand.concealedCombinaisons.reduce((numbers, combinaison) => {
      combinaison.tiles.forEach(tile => {
        if (tile instanceof NumberedTile && tile.constructor === hand.combinaisons[0].tiles[0].constructor) {
          numbers[tile.number]++
        }
      })
      return numbers
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 })

    if (!this._containsAllChuurenPoutouNumbers(numbers)) return 0

    numbers[hand.combinaisons[hand.winningCombinaisonIndex].tiles[hand.winningTileIndex].number]--

    return this._containsAllChuurenPoutouNumbers(numbers) ? 2 : 1
  }

  _containsAllChuurenPoutouNumbers (numbers) {
    return numbers[1] > 2 && numbers[9] > 2 && numbers[2] && numbers[3] && numbers[4] && numbers[5] && numbers[6] && numbers[7] && numbers[8]
  }
}

/**
 * Kokushi Musou (Thirteen Orphans)
 * A hand with one of each dragon, wind and 1 and 9 of each suit, plus an other tile to make a pair
 * Worth two yakuman if the hand was waiting on 13 different tiles (Kokushi Musou 13 men machi)
 *
 * Must be concealed: yes
 * Yakuman: 1 / 2 (Waiting on 13 different tiles)
 */
export class KokushiMusou extends YakumanPattern {
  japaneseName = 'Kokushi Musou'
  englishName = 'Thirteen Orphans'

  check (hand) {
    const nbOfPair = hand.concealedCombinaisons.filter(x => x instanceof Pair).length
    if (nbOfPair === 0) return 0

    const nbOfOrphan = hand.concealedCombinaisons.filter(x => x instanceof Orphan).length
    if (nbOfOrphan !== 12) return 0

    const nbOfValidDistinctTile = hand.concealedCombinaisons.reduce((tiles, combinaison) => {
      combinaison.tiles.forEach(tile => tiles.push(tile))
      return tiles
    }, [])
      .filter(tile => tile instanceof HonorTile || tile.isTerminal())
      .map(tile => `${tile.suit}.${tile.value}`)
      .filter((key, index, keys) => keys.indexOf(key) === index)
      .length

    if (nbOfValidDistinctTile !== 13) return 0

    return hand.combinaisons[hand.winningCombinaisonIndex] instanceof Pair ? 2 : 1
  }
}

/**
 * Tenhou (Heavenly Hand)
 * A hand won by the dealer on his first draw
 *
 * Must be concealed: yes
 * Yakuman: 1
 */
export class Tenhou extends YakumanPattern {
  japaneseName = 'Tenhou'
  englishName = 'Heavenly Hand'

  check (hand) {
    return hand.wonDuringFirstUninterruptedRound && hand.seatWind === 'east' && hand.winningType === 'tsumo' ? 1 : 0
  }
}

/**
 * Chiihou (Hand of earth)
 * A hand won by a non-dealer on his first draw when no open-meld declaration has been made
 *
 * Must be concealed: yes
 * Yakuman: 1
 */
export class Chiihou extends YakumanPattern {
  japaneseName = 'Chiihou'
  englishName = 'Hand of earth'

  check (hand) {
    return hand.wonDuringFirstUninterruptedRound && hand.seatWind !== 'east' && hand.winningType === 'tsumo' ? 1 : 0
  }
}

/**
 * Renhou (Hand of man)
 * A hand won by a non-dealer with a discard tile on his first round without open-meld
 *
 * Must be concealed: yes
 * Yakuman: 1
 */
export class Renhou extends YakumanPattern {
  japaneseName = 'Renhou'
  englishName = 'Hand of man'

  check (hand) {
    return hand.wonDuringFirstUninterruptedRound && hand.seatWind !== 'east' && hand.winningType === 'ron' ? 1 : 0
  }
}
