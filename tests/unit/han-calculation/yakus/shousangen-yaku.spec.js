import ShousangenYaku from '@/core/han-calculation/yakus/shousangen-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Quad } from '@/core/combination-classes'
import { BambooTile, DragonTile, WindTile } from '@/core/tile-classes'

const sut = new ShousangenYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Triplet(new DragonTile('red')),
    new Triplet(new DragonTile('green')),
    new Pair(new DragonTile('white')),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2))
  ]
})

test('shousangen (little three dragons) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'shousangen', hanValue: 2, yakumanValue: 0 })
})

const validHandWithKan = new Hand({
  concealedCombinations: [
    new Triplet(new DragonTile('red')),
    new Quad(new DragonTile('green')),
    new Pair(new DragonTile('white')),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2))
  ]
})

test('shousangen (little three dragons) valid hand with quad', () => {
  expect(sut.check(validHandWithKan)).toStrictEqual({ key: 'shousangen', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithoutDragonPair = new Hand({
  concealedCombinations: [
    new Triplet(new DragonTile('red')),
    new Triplet(new DragonTile('green')),
    new Pair(new WindTile('east')),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2))
  ]
})

test('shousangen (little three dragons) invalid hand without dragon pair', () => {
  expect(sut.check(invalidHandWithoutDragonPair)).toBeUndefined()
})

const invalidHandWithoutTwoDragonPon = new Hand({
  concealedCombinations: [
    new Triplet(new DragonTile('red')),
    new Triplet(new WindTile('north')),
    new Pair(new DragonTile('white')),
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2))
  ]
})

test('shousangen (little three dragons) invalid hand without two dragon triplet', () => {
  expect(sut.check(invalidHandWithoutTwoDragonPon)).toBeUndefined()
})
