import ShousangenYaku from '@/core/han-calculation/yakus/shousangen-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { BambooTile, DragonTile, WindTile } from '@/core/tile-classes'

const sut = new ShousangenYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Pon(new DragonTile('red')),
    new Pon(new DragonTile('green')),
    new Pair(new DragonTile('white')),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2))
  ]
})

test('shousangen (little three dragons) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'shousangen', hanValue: 2, yakumanValue: 0 })
})

const validHandWithKan = new Hand({
  concealedCombinaisons: [
    new Pon(new DragonTile('red')),
    new Kan(new DragonTile('green')),
    new Pair(new DragonTile('white')),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2))
  ]
})

test('shousangen (little three dragons) valid hand with kan', () => {
  expect(sut.check(validHandWithKan)).toStrictEqual({ key: 'shousangen', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithoutDragonPair = new Hand({
  concealedCombinaisons: [
    new Pon(new DragonTile('red')),
    new Pon(new DragonTile('green')),
    new Pair(new WindTile('east')),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2))
  ]
})

test('shousangen (little three dragons) invalid hand without dragon pair', () => {
  expect(sut.check(invalidHandWithoutDragonPair)).toBeUndefined()
})

const invalidHandWithoutTwoDragonPon = new Hand({
  concealedCombinaisons: [
    new Pon(new DragonTile('red')),
    new Pon(new WindTile('north')),
    new Pair(new DragonTile('white')),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2))
  ]
})

test('shousangen (little three dragons) invalid hand without two dragon pon', () => {
  expect(sut.check(invalidHandWithoutTwoDragonPon)).toBeUndefined()
})
