import IipeikouYaku from '@/core/han-calculation/yakus/iipeikou-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

const sut = new IipeikouYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('iipeikou (pure double chii) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'iipeikou', hanValue: 1, yakumanValue: 0 })
})

// test with a open hand
const invalidOpenHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5))
  ],
  openCombinaisons: [
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('iipeikou (pure double chii) invalid with a open hand', () => {
  expect(sut.check(invalidOpenHand)).toBeUndefined()
})

// test with different number
const invalidHandWithoutTwoIdenticalChii1 = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
    new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('iipeikou (pure double chii) invalid hand without two identical chii', () => {
  expect(sut.check(invalidHandWithoutTwoIdenticalChii1)).toBeUndefined()
})

// test with different suit
const invalidHandWithoutTwoIdenticalChii2 = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('iipeikou (pure double chii) invalid hand without two identical chii', () => {
  expect(sut.check(invalidHandWithoutTwoIdenticalChii2)).toBeUndefined()
})
