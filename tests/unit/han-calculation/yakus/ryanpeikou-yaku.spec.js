import RyanpeikouYaku from '@/core/han-calculation/yakus/ryanpeikou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combinaison-classes'
import { DotTile, BambooTile } from '@/core/tile-classes'

const sut = new RyanpeikouYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Sequence(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Sequence(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Pair(new DotTile(1))
  ]
})

test('ryan peikou (twice pure double chiis) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'ryanpeikou', hanValue: 3, yakumanValue: 0 })
})

describe('given the hand have a valid open ryan peikou (twice pure double chiis)', () => {
  const validOpenHand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3))
    ],
    openCombinaisons: [
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new DotTile(7), new DotTile(8), new DotTile(9)),
      new Sequence(new DotTile(7), new DotTile(8), new DotTile(9))
    ]
  })

  test('should not return any han by default', () => {
    expect(sut.check(validOpenHand)).toBeUndefined()
  })

  test('should return 2 han if the yaku option allow open hand', () => {
    expect(new RyanpeikouYaku({ allowOpen: true }).check(validOpenHand)).toStrictEqual({ key: 'ryanpeikou', hanValue: 2, yakumanValue: 0 })
  })
})

const invalidHandWitoutTwoPairOfChii = new Hand({
  concealedCombinaisons: [
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Sequence(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DotTile(1))
  ]
})

test('ryan peikou (twice pure double chiis) invalid hand without two pair of sequence', () => {
  expect(sut.check(invalidHandWitoutTwoPairOfChii)).toBeUndefined()
})

const invalidHandWithoutChii = new Hand({
  concealedCombinaisons: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2)),
    new Triplet(new DotTile(7)),
    new Triplet(new DotTile(1)),
    new Pair(new DotTile(1))
  ]
})

test('ryan peikou (twice pure double chiis) invalid hand without sequence', () => {
  expect(sut.check(invalidHandWithoutChii)).toBeUndefined()
})
