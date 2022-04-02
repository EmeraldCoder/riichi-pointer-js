import { describe, expect, test } from 'vitest'
import isTankiWait from '@/core/waits/is-tanki-wait'
import Hand from '@/core/hand'
import { Pair, Triplet, Sequence } from '@/core/combination-classes'
import { DotTile } from '@/core/tile-classes'

describe('given the hand was won by completing a pair', () => {
  test('should be considered tanki wait', () => {
    const hand = new Hand({
      concealedCombinations: [
        new Pair(new DotTile(1)),
        new Triplet(new DotTile(2)),
        new Triplet(new DotTile(3)),
        new Triplet(new DotTile(4)),
        new Triplet(new DotTile(5))
      ],
      winningCombinationIndex: 0,
      winningTileIndex: 0
    })

    expect(isTankiWait(hand)).toBe(true)
  })
})

describe('given the hand was won by completing a triplet', () => {
  test('should not be considered tanki wait', () => {
    const hand = new Hand({
      concealedCombinations: [
        new Pair(new DotTile(1)),
        new Triplet(new DotTile(2)),
        new Triplet(new DotTile(3)),
        new Triplet(new DotTile(4)),
        new Triplet(new DotTile(5))
      ],
      winningCombinationIndex: 1,
      winningTileIndex: 0
    })

    expect(isTankiWait(hand)).toBe(false)
  })
})

describe('given the hand was won by completing a sequence', () => {
  test('should not be considered tanki wait', () => {
    const hand = new Hand({
      concealedCombinations: [
        new Pair(new DotTile(1)),
        new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
        new Triplet(new DotTile(3)),
        new Triplet(new DotTile(4)),
        new Triplet(new DotTile(5))
      ],
      winningCombinationIndex: 1,
      winningTileIndex: 0
    })

    expect(isTankiWait(hand)).toBe(false)
  })
})
