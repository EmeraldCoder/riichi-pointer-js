import isTankiWait from '@/core/waits/is-tanki-wait'
import Hand from '@/core/hand'
import { Pair, Pon, Chii } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

describe('given the hand was won by completing a pair', () => {
  test('should be considered tanki wait', () => {
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

    expect(isTankiWait(hand)).toBe(true)
  })
})

describe('given the hand was won by completing a pon', () => {
  test('should not be considered tanki wait', () => {
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

    expect(isTankiWait(hand)).toBe(false)
  })
})

describe('given the hand was won by completing a chii', () => {
  test('should not be considered tanki wait', () => {
    const hand = new Hand({
      concealedCombinaisons: [
        new Pair(new DotTile(1)),
        new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pon(new DotTile(5))
      ],
      winningCombinaisonIndex: 1,
      winningTileIndex: 0
    })

    expect(isTankiWait(hand)).toBe(false)
  })
})
