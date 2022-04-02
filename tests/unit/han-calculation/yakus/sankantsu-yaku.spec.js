import { expect, test } from 'vitest'
import SankantsuYaku from '@/core/han-calculation/yakus/sankantsu-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Quad } from '@/core/combination-classes'
import { DotTile } from '@/core/tile-classes'

const sut = new SankantsuYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Quad(new DotTile(1)),
    new Quad(new DotTile(2)),
    new Quad(new DotTile(3)),
    new Triplet(new DotTile(4)),
    new Pair(new DotTile(6))
  ]
})

test('Sankantsu (3 kans) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'sankantsu', hanValue: 2, yakumanValue: 0 })
})

const validHandWithOpenKan = new Hand({
  concealedCombinations: [
    new Quad(new DotTile(3)),
    new Triplet(new DotTile(4)),
    new Pair(new DotTile(6))
  ],
  openCombinations: [
    new Quad(new DotTile(1)),
    new Quad(new DotTile(2))
  ]
})

test('Sankantsu (3 kans) valid hand with open quad', () => {
  expect(sut.check(validHandWithOpenKan)).toStrictEqual({ key: 'sankantsu', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithLessThanThreeKan = new Hand({
  concealedCombinations: [
    new Quad(new DotTile(1)),
    new Quad(new DotTile(2)),
    new Triplet(new DotTile(3)),
    new Triplet(new DotTile(4)),
    new Pair(new DotTile(6))
  ]
})

test('Sankantsu (3 kans) invalid hand with less than three quad', () => {
  expect(sut.check(invalidHandWithLessThanThreeKan)).toBeUndefined()
})
