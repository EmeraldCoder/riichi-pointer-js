import { Iipeikou } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

var iipeikou = new Iipeikou()

var validHand = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('iipeikou (pure double chii) valid hand', function () {
  expect(iipeikou.check(validHand)).toBe(1)
})

// test with a open hand
var invalidOpenHand = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5))
], [
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
])
test('iipeikou (pure double chii) invalid with a open hand', function () {
  expect(iipeikou.check(invalidOpenHand)).toBe(0)
})

// test with different number
var invalidHandWithoutTwoIdenticalChii1 = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
  new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('iipeikou (pure double chii) invalid hand without two identical chii', function () {
  expect(iipeikou.check(invalidHandWithoutTwoIdenticalChii1)).toBe(0)
})

// test with different suit
var invalidHandWithoutTwoIdenticalChii2 = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
  new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('iipeikou (pure double chii) invalid hand without two identical chii', function () {
  expect(iipeikou.check(invalidHandWithoutTwoIdenticalChii2)).toBe(0)
})
