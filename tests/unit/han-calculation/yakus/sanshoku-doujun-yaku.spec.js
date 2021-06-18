import SanshokuDoujunYaku from '@/core/han-calculation/yakus/sanshoku-doujun-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

const sut = new SanshokuDoujunYaku()

const validConcealedHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Chii(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku doujun (mixed triple chii) valid concealed hand', () => {
  expect(sut.check(validConcealedHand)).toStrictEqual({ key: 'sanshoku doujun', hanValue: 2, yakumanValue: 0 })
})

const validOpenHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Chii(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4))
  ],
  openCombinaisons: [
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku doujun (mixed triple chii) valid open hand', () => {
  expect(sut.check(validOpenHand)).toStrictEqual({ key: 'sanshoku doujun', hanValue: 1, yakumanValue: 0 })
})

const invalidHandWithOnlyTwoChiiOfTheSameValue = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Pon(new CharacterTile(2)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku doujun (mixed triple chii) invalid hand with only two chii of the same value', () => {
  expect(sut.check(invalidHandWithOnlyTwoChiiOfTheSameValue)).toBeUndefined()
})

const invalidHandWithoutThreeDifferentSuit = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku doujun (mixed triple chii) invalid hand without three different suit', () => {
  expect(sut.check(invalidHandWithoutThreeDifferentSuit)).toBeUndefined()
})
