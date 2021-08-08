import IipeikouYaku from '@/core/han-calculation/yakus/iipeikou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combination-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

const sut = new IipeikouYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('iipeikou (pure double sequence) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'iipeikou', hanValue: 1, yakumanValue: 0 })
})

// test with a open hand
const invalidOpenHand = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5))
  ],
  openCombinations: [
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('iipeikou (pure double sequence) invalid with a open hand', () => {
  expect(sut.check(invalidOpenHand)).toBeUndefined()
})

// test with different number
const invalidHandWithoutTwoIdenticalChii1 = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
    new Sequence(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('iipeikou (pure double sequence) invalid hand without two identical sequence', () => {
  expect(sut.check(invalidHandWithoutTwoIdenticalChii1)).toBeUndefined()
})

// test with different suit
const invalidHandWithoutTwoIdenticalChii2 = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Sequence(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('iipeikou (pure double sequence) invalid hand without two identical sequence', () => {
  expect(sut.check(invalidHandWithoutTwoIdenticalChii2)).toBeUndefined()
})
