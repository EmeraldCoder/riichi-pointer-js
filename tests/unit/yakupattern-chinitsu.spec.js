import { Chinitsu } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

var chinitsu = new Chinitsu()
var validHand = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(9)),
  new Pair(new BambooTile(7))
], [])
test('chinitsu (full flush) valid hand', function () {
  expect(chinitsu.check(validHand)).toBe(6)
})

var validHandWithOpenCombinaison = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
  new Pair(new BambooTile(7))
], [
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(9))
])
test('chinitsu (full flush) valid hand with open combinaison', function () {
  expect(chinitsu.check(validHandWithOpenCombinaison)).toBe(5)
})

var invalidHandWithHonorTiles = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(9)),
  new Pair(new DragonTile('white'))
], [])
test('chinitsu (full flush) invalid hand with honor tile', function () {
  expect(chinitsu.check(invalidHandWithHonorTiles)).toBe(0)
})

var invalidHandWithTwoSuit = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
  new Pon(new BambooTile(1)),
  new Pon(new DotTile(9)),
  new Pair(new BambooTile(7))
], [])
test('chinitsu (full flush) invalid hand with two suit', function () {
  expect(chinitsu.check(invalidHandWithTwoSuit)).toBe(0)
})
