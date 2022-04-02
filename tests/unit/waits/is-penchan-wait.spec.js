import { describe, expect, test } from 'vitest'
import isPenchanWait from '@/core/waits/is-penchan-wait'
import Hand from '@/core/hand'
import { Pair, Triplet, Sequence } from '@/core/combination-classes'
import { DotTile } from '@/core/tile-classes'

describe('given the hand was won by completing a pair', () => {
  test('should be considered penchan wait', () => {
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

    expect(isPenchanWait(hand)).toBe(false)
  })
})

describe('given the hand was won by completing a triplet', () => {
  test('should not be considered penchan wait', () => {
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

    expect(isPenchanWait(hand)).toBe(false)
  })
})

describe('given the hand was won by completing a sequence', () => {
  test('should not be considered penchan wait if the winning tile was the tile in the middle of the combination', () => {
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

    expect(isPenchanWait(hand)).toBe(false)
  })

  test('should be considered penchan wait if the winning tile had the value 3 on a 1-2-3 sequence', () => {
    const hand = new Hand({
      concealedCombinations: [
        new Pair(new DotTile(1)),
        new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
        new Triplet(new DotTile(3)),
        new Triplet(new DotTile(4)),
        new Triplet(new DotTile(5))
      ],
      winningCombinationIndex: 1,
      winningTileIndex: 2
    })

    expect(isPenchanWait(hand)).toBe(true)
  })

  test('should be considered penchan wait if the winning tile had the value 7 on a 7-8-9 sequence', () => {
    const hand = new Hand({
      concealedCombinations: [
        new Pair(new DotTile(1)),
        new Sequence(new DotTile(7), new DotTile(8), new DotTile(9)),
        new Triplet(new DotTile(3)),
        new Triplet(new DotTile(4)),
        new Triplet(new DotTile(5))
      ],
      winningCombinationIndex: 1,
      winningTileIndex: 0
    })

    expect(isPenchanWait(hand)).toBe(true)
  })

  test('should not be considered penchan wait if the winning tile was the first or last tile of the combination (not 1-2-3 and 7-8-9)', () => {
    const hand = new Hand({
      concealedCombinations: [
        new Pair(new DotTile(1)),
        new Sequence(new DotTile(5), new DotTile(6), new DotTile(7)),
        new Triplet(new DotTile(3)),
        new Triplet(new DotTile(4)),
        new Triplet(new DotTile(5))
      ],
      winningCombinationIndex: 1,
      winningTileIndex: 0
    })

    expect(isPenchanWait(hand)).toBe(false)
  })
})
