import ChinitsuYaku from '@/core/han-calculation/yakus/chinitsu-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combination-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

const sut = new ChinitsuYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(9)),
    new Pair(new BambooTile(7))
  ]
})

test('chinitsu (full flush) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'chinitsu', hanValue: 6, yakumanValue: 0 })
})

const validHandWithOpenCombination = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Pair(new BambooTile(7))
  ],
  openCombinations: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(9))
  ]
})

test('chinitsu (full flush) valid hand with open combination', () => {
  expect(sut.check(validHandWithOpenCombination)).toStrictEqual({ key: 'chinitsu', hanValue: 5, yakumanValue: 0 })
})

const invalidHandWithHonorTiles = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(9)),
    new Pair(new DragonTile('white'))
  ]
})

test('chinitsu (full flush) invalid hand with honor tile', () => {
  expect(sut.check(invalidHandWithHonorTiles)).toBeUndefined()
})

const invalidHandWithTwoSuit = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Triplet(new BambooTile(1)),
    new Triplet(new DotTile(9)),
    new Pair(new BambooTile(7))
  ]
})

test('chinitsu (full flush) invalid hand with two suit', () => {
  expect(sut.check(invalidHandWithTwoSuit)).toBeUndefined()
})
