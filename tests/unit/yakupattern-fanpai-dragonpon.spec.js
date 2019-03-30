import { FanpaiDragonPon } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

var fanpaiDragonPon = new FanpaiDragonPon()

var validHand = new Hand([
  new Pon(new DragonTile('red')),
  new Pon(new BambooTile(7)),
  new Pon(new BambooTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('fanpai (dragon pon) valid hand', function () {
  expect(fanpaiDragonPon.check(validHand)).toBe(1)
})

var validHandWithTwoDragonPon = new Hand([
  new Pon(new DragonTile('red')),
  new Pon(new DragonTile('white')),
  new Pon(new BambooTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('fanpai (dragon pon) valid hand with two dragon pon', function () {
  expect(fanpaiDragonPon.check(validHandWithTwoDragonPon)).toBe(2)
})

var validHandWithThreeDragonPon = new Hand([
  new Pon(new DragonTile('red')),
  new Pon(new DragonTile('white')),
  new Pon(new DragonTile('green')),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('fanpai (dragon pon) valid hand with three dragon pon', function () {
  expect(fanpaiDragonPon.check(validHandWithThreeDragonPon)).toBe(3)
})

var validHandWithKan = new Hand([
  new Kan(new DragonTile('red')),
  new Pon(new BambooTile(7)),
  new Pon(new BambooTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('fanpai (dragon pon) valid hand with kan', function () {
  expect(fanpaiDragonPon.check(validHandWithKan)).toBe(1)
})

var invalidHandWithDragonPon = new Hand([
  new Kan(new BambooTile(1)),
  new Pon(new BambooTile(7)),
  new Pon(new BambooTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('fanpai (dragon pon) invalid hand without dragon pon', function () {
  expect(fanpaiDragonPon.check(invalidHandWithDragonPon)).toBe(0)
})
