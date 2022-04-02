import { describe, expect, test } from 'vitest'
import isKanchanWait from '@/core/waits/is-kanchan-wait'
import Hand from '@/core/hand'
import { Pair, Triplet, Sequence } from '@/core/combination-classes'
import { DotTile } from '@/core/tile-classes'

describe('given the hand was won by completing a pair', () => {
  test('should be considered kanchan wait', () => {
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

    expect(isKanchanWait(hand)).toBe(false)
  })
})

describe('given the hand was won by completing a triplet', () => {
  test('should not be considered kanchan wait', () => {
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

    expect(isKanchanWait(hand)).toBe(false)
  })
})

describe('given the hand was won by completing a sequence', () => {
  test('should be considered kanchan wait if the winning tile was the tile in the middle of the combination', () => {
    const hand = new Hand({
      concealedCombinations: [
        new Pair(new DotTile(1)),
        new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
        new Triplet(new DotTile(3)),
        new Triplet(new DotTile(4)),
        new Triplet(new DotTile(5))
      ],
      winningCombinationIndex: 1,
      winningTileIndex: 1
    })

    expect(isKanchanWait(hand)).toBe(true)
  })

  test('should not be considered kanchan wait if the winning tile was not the tile in the middle of the combination', () => {
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

    expect(isKanchanWait(hand)).toBe(false)
  })
})
