import { SanShokuDoujun } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

var sanShokuDoujun = new SanShokuDoujun()

var validConcealedHand = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
  new Chii(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('san shoku doujun (mixed triple chii) valid concealed hand', function () {
  expect(sanShokuDoujun.check(validConcealedHand)).toBe(2)
})

var validOpenHand = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
  new Chii(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4))
], [
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
])
test('san shoku doujun (mixed triple chii) valid open hand', function () {
  expect(sanShokuDoujun.check(validOpenHand)).toBe(1)
})

var invalidHandWithOnlyTwoChiiOfTheSameValue = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
  new Pon(new CharacterTile(2)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('san shoku doujun (mixed triple chii) invalid hand with only two chii of the same value', function () {
  expect(sanShokuDoujun.check(invalidHandWithOnlyTwoChiiOfTheSameValue)).toBe(0)
})

var invalidHandWithoutThreeDifferentSuit = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
  new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(7))
], [])
test('san shoku doujun (mixed triple chii) invalid hand without three different suit', function () {
  expect(sanShokuDoujun.check(invalidHandWithoutThreeDifferentSuit)).toBe(0)
})
