import HonitsuYaku from '@/core/han-calculation/yakus/honitsu-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair } from '@/core/combination-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

const sut = new HonitsuYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Pair(new DragonTile('green')),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2)),
    new Triplet(new BambooTile(3)),
    new Triplet(new BambooTile(4))
  ]
})
test('honitsu (half flush) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'honitsu', hanValue: 3, yakumanValue: 0 })
})

const validHandWithOpenCombination = new Hand({
  concealedCombinations: [
    new Pair(new DragonTile('green')),
    new Triplet(new BambooTile(3)),
    new Triplet(new BambooTile(4))
  ],
  openCombinations: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2))
  ]
})
test('honitsu (half flush) valid hand with open combination', () => {
  expect(sut.check(validHandWithOpenCombination)).toStrictEqual({ key: 'honitsu', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithoutHonorTile = new Hand({
  concealedCombinations: [
    new Triplet(new BambooTile(9)),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2)),
    new Triplet(new BambooTile(3)),
    new Pair(new BambooTile(4))
  ]
})
test('honitsu (half flush) invalid hand without honor tile', () => {
  expect(sut.check(invalidHandWithoutHonorTile)).toBeUndefined()
})

const invalidHandWithTwoSuit = new Hand({
  concealedCombinations: [
    new Pair(new DragonTile('green')),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2)),
    new Triplet(new BambooTile(3)),
    new Triplet(new DotTile(4))
  ]
})
test('honitsu (half flush) invalid hand with two suit', () => {
  expect(sut.check(invalidHandWithTwoSuit)).toBeUndefined()
})
