import IttsuuYaku from '@/core/han-calculation/yakus/ittsuu-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile } from '@/core/tile-classes'

const sut = new IttsuuYaku()

const validConcealedHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('ittsuu (pure straight) valid concealed hand', () => {
  expect(sut.check(validConcealedHand)).toStrictEqual({ key: 'ittsuu', hanValue: 2, yakumanValue: 0 })
})

const validOpenHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6))
  ],
  openCombinaisons: [
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('ittsuu (pure straight) valid open hand', () => {
  expect(sut.check(validOpenHand)).toStrictEqual({ key: 'ittsuu', hanValue: 1, yakumanValue: 0 })
})

const invalidHandWithoutOneToNineNumber = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('ittsuu (pure straight) invalid hand without one to nine number', () => {
  expect(sut.check(invalidHandWithoutOneToNineNumber)).toBeUndefined()
})

const invalidHandWithTwoSuit = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('ittsuu (pure straight) valid hand', () => {
  expect(sut.check(invalidHandWithTwoSuit)).toBeUndefined()
})
