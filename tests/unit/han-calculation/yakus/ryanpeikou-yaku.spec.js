import RyanpeikouYaku from '@/core/han-calculation/yakus/ryanpeikou-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile } from '@/core/tile-classes'

const sut = new RyanpeikouYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
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
      new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3))
    ],
    openCombinaisons: [
      new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
      new Chii(new DotTile(7), new DotTile(8), new DotTile(9))
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
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DotTile(1))
  ]
})

test('ryan peikou (twice pure double chiis) invalid hand without two pair of chii', () => {
  expect(sut.check(invalidHandWitoutTwoPairOfChii)).toBeUndefined()
})

const invalidHandWithoutChii = new Hand({
  concealedCombinaisons: [
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2)),
    new Pon(new DotTile(7)),
    new Pon(new DotTile(1)),
    new Pair(new DotTile(1))
  ]
})

test('ryan peikou (twice pure double chiis) invalid hand without chii', () => {
  expect(sut.check(invalidHandWithoutChii)).toBeUndefined()
})
