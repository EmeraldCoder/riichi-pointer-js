import ClosedRonRule from '@/core/fu-calculation/rules/closed-ron-fu-rule'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

describe('given the hand is not concealed', () => {
  const hand = new Hand(
    [
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      new Pair(new DotTile(4))
    ],
    [
      new Pon(new DotTile(5))
    ],
    'east', 'east', 1, 0, 'ron'
  )

  test('should not return any fu info', () => {
    const result = new ClosedRonRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the hand was not won by ron (discard)', () => {
  const hand = new Hand(
    [
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      new Pon(new DotTile(5)),
      new Pair(new DotTile(4))
    ],
    [], 'east', 'east', 1, 0, 'tsumo'
  )

  test('should not return any fu info', () => {
    const result = new ClosedRonRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the hand is concealed and was won by ron (discard)', () => {
  const hand = new Hand(
    [
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      new Pon(new DotTile(5)),
      new Pair(new DotTile(4))
    ],
    [], 'east', 'east', 1, 0, 'ron'
  )

  test('should return 10 fu', () => {
    const result = new ClosedRonRule().check(hand)
    expect(result).toStrictEqual({ key: 'closed ron', fuValue: 10, quantity: 1 })
  })
})
