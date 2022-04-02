import { expect, test } from 'vitest'
import SanshokuDoujunYaku from '@/core/han-calculation/yakus/sanshoku-doujun-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combination-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

const sut = new SanshokuDoujunYaku()

const validConcealedHand = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Sequence(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku doujun (mixed triple sequence) valid concealed hand', () => {
  expect(sut.check(validConcealedHand)).toStrictEqual({ key: 'sanshoku doujun', hanValue: 2, yakumanValue: 0 })
})

const validOpenHand = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Sequence(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4))
  ],
  openCombinations: [
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku doujun (mixed triple sequence) valid open hand', () => {
  expect(sut.check(validOpenHand)).toStrictEqual({ key: 'sanshoku doujun', hanValue: 1, yakumanValue: 0 })
})

const invalidHandWithOnlyTwoChiiOfTheSameValue = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Triplet(new CharacterTile(2)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku doujun (mixed triple sequence) invalid hand with only two sequence of the same value', () => {
  expect(sut.check(invalidHandWithOnlyTwoChiiOfTheSameValue)).toBeUndefined()
})

const invalidHandWithoutThreeDifferentSuit = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku doujun (mixed triple sequence) invalid hand without three different suit', () => {
  expect(sut.check(invalidHandWithoutThreeDifferentSuit)).toBeUndefined()
})
