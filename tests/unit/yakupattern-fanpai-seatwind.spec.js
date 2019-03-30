import { FanpaiSeatWind } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile, BambooTile, WindTile } from '@/core/tile-classes'

var fanpaiSeatWind = new FanpaiSeatWind()

var validHand = new Hand([
  new Pon(new WindTile('west')),
  new Pon(new BambooTile(7)),
  new Pon(new BambooTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [], 'west')
test('fanpai (seat wind) valid hand', function () {
  expect(fanpaiSeatWind.check(validHand)).toBe(1)
})

var validHandWithKan = new Hand([
  new Kan(new WindTile('west')),
  new Pon(new BambooTile(7)),
  new Pon(new BambooTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [], 'west')
test('fanpai (seat wind) valid hand with kan', function () {
  expect(fanpaiSeatWind.check(validHandWithKan)).toBe(1)
})

var invalidHandWithWrongWindPon = new Hand([
  new Pon(new WindTile('north')),
  new Pon(new BambooTile(7)),
  new Pon(new BambooTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [], 'west')
test('fanpai (seat wind) invalid hand with wrong wind pon', function () {
  expect(fanpaiSeatWind.check(invalidHandWithWrongWindPon)).toBe(0)
})

var invalidHandWithoutWindPon = new Hand([
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(7)),
  new Pon(new BambooTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [], 'west')
test('fanpai (seat wind) invalid hand without wind pon', function () {
  expect(fanpaiSeatWind.check(invalidHandWithoutWindPon)).toBe(0)
})
