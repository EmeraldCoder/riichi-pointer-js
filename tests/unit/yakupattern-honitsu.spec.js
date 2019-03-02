import { Honitsu } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

var honitsu = new Honitsu()

var validHand = new Hand([
  new Pair(new DragonTile('green')),
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(2)),
  new Pon(new BambooTile(3)),
  new Pon(new BambooTile(4))
], [])
test('honitsu (half flush) valid hand', function () {
  expect(honitsu.check(validHand)).toBe(3)
})

var validHandWithOpenCombinaison = new Hand([
  new Pair(new DragonTile('green')),
  new Pon(new BambooTile(3)),
  new Pon(new BambooTile(4))
], [
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(2))
])
test('honitsu (half flush) valid hand with open combinaison', function () {
  expect(honitsu.check(validHandWithOpenCombinaison)).toBe(2)
})

var invalidHandWithoutHonorTile = new Hand([
  new Pon(new BambooTile(9)),
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(2)),
  new Pon(new BambooTile(3)),
  new Pair(new BambooTile(4))
], [])
test('honitsu (half flush) invalid hand without honor tile', function () {
  expect(honitsu.check(invalidHandWithoutHonorTile)).toBe(0)
})

var invalidHandWithTwoSuit = new Hand([
  new Pair(new DragonTile('green')),
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(2)),
  new Pon(new BambooTile(3)),
  new Pon(new DotTile(4))
], [])
test('honitsu (half flush) invalid hand with two suit', function () {
  expect(honitsu.check(invalidHandWithTwoSuit)).toBe(0)
})
