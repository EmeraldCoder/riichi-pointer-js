import OpenPinfuRule from '@/core/fu-calculation/rules/open-pinfu-fu-rule'
import Hand from '@/core/hand'
import { Pair, Sequence, Triplet, Quad } from '@/core/combinaison-classes'
import { DotTile, DragonTile, WindTile } from '@/core/tile-classes'

function expectNoFu (hand) {
  return () => { expect(new OpenPinfuRule().check(hand)).toBeUndefined() }
}

describe('given the hand was won by tsumo', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    winningType: 'tsumo'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand is concealed', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(2)),
      new Sequence(new DotTile(2)),
      new Pair(new DotTile(9))
    ],
    winningType: 'ron'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand have more than one pair (chiitoitsu)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pair(new DotTile(2)),
      new Pair(new DotTile(3)),
      new Pair(new DotTile(4)),
      new Pair(new DotTile(5)),
      new Pair(new DotTile(6)),
      new Pair(new DotTile(7))
    ],
    winningType: 'ron'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand have one or more triplet', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DotTile(1)),
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(2)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5))
    ],
    winningType: 'ron'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand have one or more quad', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Quad(new DotTile(1)),
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(2)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5))
    ],
    winningType: 'ron'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is a green dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(2)),
      new Pair(new DragonTile('green'))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5))
    ],
    winningType: 'ron'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is a red dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(2)),
      new Pair(new DragonTile('red'))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5))
    ],
    winningType: 'ron'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is a white dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(2)),
      new Pair(new DragonTile('white'))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5))
    ],
    winningType: 'ron'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is the round wind', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(2)),
      new Pair(new WindTile('east'))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5))
    ],
    winningType: 'ron',
    roundWind: 'east',
    seatWind: 'south'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the pair is the seat wind', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(1)),
      new Sequence(new DotTile(2)),
      new Pair(new WindTile('south'))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5))
    ],
    winningType: 'ron',
    roundWind: 'east',
    seatWind: 'south'
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the wait is a single wait', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    winningType: 'ron',
    winningCombinaisonIndex: 3,
    winningTileIndex: 0
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the wait is a edge wait', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    winningType: 'ron',
    winningCombinaisonIndex: 0,
    winningTileIndex: 2
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the wait is a closed wait', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    winningType: 'ron',
    winningCombinaisonIndex: 0,
    winningTileIndex: 1
  })

  test('should not return any fu info', expectNoFu(hand))
})

describe('given the hand is open, without pair/combinaisons/wait fu and was won by ron (discard)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    winningType: 'ron',
    winningCombinaisonIndex: 0,
    winningTileIndex: 0
  })

  test('should return 10 fu', () => {
    const result = new OpenPinfuRule().check(hand)
    expect(result).toStrictEqual({ key: 'open pinfu', fuValue: 10, quantity: 1 })
  })
})

describe('given the hand have a valid shape and the pair is a different wind from the round and seat wind', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new WindTile('north'))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7))
    ],
    winningType: 'ron',
    winningCombinaisonIndex: 0,
    winningTileIndex: 0,
    roundWind: 'east',
    seatWind: 'south'
  })

  test('should return 10 fu', () => {
    const result = new OpenPinfuRule().check(hand)
    expect(result).toStrictEqual({ key: 'open pinfu', fuValue: 10, quantity: 1 })
  })
})
