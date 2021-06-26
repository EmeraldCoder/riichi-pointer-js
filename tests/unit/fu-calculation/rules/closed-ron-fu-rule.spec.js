import ClosedRonRule from '@/core/fu-calculation/rules/closed-ron-fu-rule'
import Hand from '@/core/hand'
import { Triplet, Pair } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

describe('given the hand is not concealed', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Triplet(new DotTile(3)),
      new Pair(new DotTile(4))
    ],
    openCombinaisons: [
      new Triplet(new DotTile(5))
    ]
  })

  test('should not return any fu info', () => {
    const result = new ClosedRonRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the hand was not won by ron (discard)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Triplet(new DotTile(3)),
      new Triplet(new DotTile(5)),
      new Pair(new DotTile(4))
    ],
    winningType: 'tsumo'
  })

  test('should not return any fu info', () => {
    const result = new ClosedRonRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the hand is concealed and was won by ron (discard)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Triplet(new DotTile(3)),
      new Triplet(new DotTile(5)),
      new Pair(new DotTile(4))
    ],
    winningType: 'ron'
  })

  test('should return 10 fu', () => {
    const result = new ClosedRonRule().check(hand)
    expect(result).toStrictEqual({ key: 'closed ron', fuValue: 10, quantity: 1 })
  })
})
