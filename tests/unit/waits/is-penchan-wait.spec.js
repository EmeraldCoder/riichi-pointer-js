import isPenchanWait from '@/core/waits/is-penchan-wait'
import Hand from '@/core/hand'
import { Pair, Pon, Chii } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

describe('given the hand was won by completing a pair', () => {
  test('should be considered penchan wait', () => {
    const hand = new Hand({
      concealedCombinaisons: [
        new Pair(new DotTile(1)),
        new Pon(new DotTile(2)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pon(new DotTile(5))
      ],
      winningCombinaisonIndex: 0,
      winningTileIndex: 0
    })

    expect(isPenchanWait(hand)).toBe(false)
  })
})

describe('given the hand was won by completing a pon', () => {
  test('should not be considered penchan wait', () => {
    const hand = new Hand({
      concealedCombinaisons: [
        new Pair(new DotTile(1)),
        new Pon(new DotTile(2)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pon(new DotTile(5))
      ],
      winningCombinaisonIndex: 1,
      winningTileIndex: 0
    })

    expect(isPenchanWait(hand)).toBe(false)
  })
})

describe('given the hand was won by completing a chii', () => {
  test('should not be considered penchan wait if the winning tile was the tile in the middle of the combinaison', () => {
    const hand = new Hand({
      concealedCombinaisons: [
        new Pair(new DotTile(1)),
        new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pon(new DotTile(5))
      ],
      winningCombinaisonIndex: 1,
      winningTileIndex: 1
    })

    expect(isPenchanWait(hand)).toBe(false)
  })

  test('should be considered penchan wait if the winning tile had the value 3 on a 1-2-3 sequence', () => {
    const hand = new Hand({
      concealedCombinaisons: [
        new Pair(new DotTile(1)),
        new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pon(new DotTile(5))
      ],
      winningCombinaisonIndex: 1,
      winningTileIndex: 2
    })

    expect(isPenchanWait(hand)).toBe(true)
  })

  test('should be considered penchan wait if the winning tile had the value 7 on a 7-8-9 sequence', () => {
    const hand = new Hand({
      concealedCombinaisons: [
        new Pair(new DotTile(1)),
        new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pon(new DotTile(5))
      ],
      winningCombinaisonIndex: 1,
      winningTileIndex: 0
    })

    expect(isPenchanWait(hand)).toBe(true)
  })

  test('should not be considered penchan wait if the winning tile was the first or last tile of the combinaison (not 1-2-3 and 7-8-9)', () => {
    const hand = new Hand({
      concealedCombinaisons: [
        new Pair(new DotTile(1)),
        new Chii(new DotTile(5), new DotTile(6), new DotTile(7)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pon(new DotTile(5))
      ],
      winningCombinaisonIndex: 1,
      winningTileIndex: 0
    })

    expect(isPenchanWait(hand)).toBe(false)
  })
})
