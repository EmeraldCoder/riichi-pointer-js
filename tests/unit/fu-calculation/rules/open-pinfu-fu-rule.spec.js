import OpenPinfuRule from '@/core/fu-calculation/rules/open-pinfu-fu-rule'
import { Hand } from '@/core/hand-classes'
import { Pair, Chii, Pon, Kan } from '@/core/combinaison-classes'
import { DotTile, DragonTile, WindTile } from '@/core/tile-classes'

function expectNoFu(hand) {
  return () => { expect(new OpenPinfuRule().check(hand)).toBeUndefined() }
}

describe('given the hand was won by tsumo', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    [
      new Chii(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    'east', 'east', 0, 0, 'tsumo'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand is concealed', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1)),
      new Chii(new DotTile(1)),
      new Chii(new DotTile(2)),
      new Chii(new DotTile(2)),
      new Pair(new DotTile(9))
    ],
    [], 'east', 'east', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand have more than one pair (chiitoitsu)', () => {
  const hand = new Hand(
    [
      new Pair(new DotTile(1)),
      new Pair(new DotTile(2)),
      new Pair(new DotTile(3)),
      new Pair(new DotTile(4)),
      new Pair(new DotTile(5)),
      new Pair(new DotTile(6)),
      new Pair(new DotTile(7))
    ],
    [],
    'east', 'east', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand have one or more pon', () => {
  const hand = new Hand(
    [
      new Pon(new DotTile(1)),
      new Chii(new DotTile(1)),
      new Chii(new DotTile(2)),
      new Pair(new DotTile(9))
    ],
    [
      new Chii(new DotTile(5))
    ],
    'east', 'east', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand have one or more kan', () => {
  const hand = new Hand(
    [
      new Kan(new DotTile(1)),
      new Chii(new DotTile(1)),
      new Chii(new DotTile(2)),
      new Pair(new DotTile(9))
    ],
    [
      new Chii(new DotTile(5))
    ],
    'east', 'east', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is a green dragon', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1)),
      new Chii(new DotTile(1)),
      new Chii(new DotTile(2)),
      new Pair(new DragonTile('green'))
    ],
    [
      new Chii(new DotTile(5))
    ],
    'east', 'east', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is a red dragon', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1)),
      new Chii(new DotTile(1)),
      new Chii(new DotTile(2)),
      new Pair(new DragonTile('red'))
    ],
    [
      new Chii(new DotTile(5))
    ],
    'east', 'east', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is a white dragon', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1)),
      new Chii(new DotTile(1)),
      new Chii(new DotTile(2)),
      new Pair(new DragonTile('white'))
    ],
    [
      new Chii(new DotTile(5))
    ],
    'east', 'east', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is the round wind', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1)),
      new Chii(new DotTile(1)),
      new Chii(new DotTile(2)),
      new Pair(new WindTile('east'))
    ],
    [
      new Chii(new DotTile(5))
    ],
    'east', 'south', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is the seat wind', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1)),
      new Chii(new DotTile(1)),
      new Chii(new DotTile(2)),
      new Pair(new WindTile('south'))
    ],
    [
      new Chii(new DotTile(5))
    ],
    'east', 'south', 0, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the wait is a single wait', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    [
      new Chii(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    'east', 'south', 3, 0, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the wait is a edge wait', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    [
      new Chii(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    'east', 'south', 0, 2, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the wait is a closed wait', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    [
      new Chii(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    'east', 'south', 0, 1, 'ron'
  )

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand is open, without pair/combinaisons/wait fu and was won by ron (discard)', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    [
      new Chii(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    'east', 'south', 0, 0, 'ron'
  )

  test('should return 10 fu', () => {
    const result = new OpenPinfuRule().check(hand)
    expect(result).toStrictEqual({ key: 'open pinfu', fuValue: 10, quantity: 1 })
  })
})

describe('given the hand have a valid shape and the pair is a different wind from the round and seat wind', () => {
  const hand = new Hand(
    [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new WindTile('north'))
    ],
    [
      new Chii(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    'east', 'south', 0, 0, 'ron'
  )

  test('should return 10 fu', () => {
    const result = new OpenPinfuRule().check(hand)
    expect(result).toStrictEqual({ key: 'open pinfu', fuValue: 10, quantity: 1 })
  })
})

