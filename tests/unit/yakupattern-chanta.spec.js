import { Chanta } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

var chanta = new Chanta()

var validConcealedHand = new Hand([
  new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
  new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
  new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
  new Pon(new DragonTile('red')),
  new Pair(new DotTile(1))
], [])
test('chanta (outside hand) valid concealed hand', function () {
  expect(chanta.check(validConcealedHand)).toBe(2)
})

var validOpenHand = new Hand([
  new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
  new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
  new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3))
], [
  new Pon(new DragonTile('red')),
  new Pair(new DotTile(1))
])
test('chanta (outside hand) valid open hand', function () {
  expect(chanta.check(validOpenHand)).toBe(1)
})

var invalidHandWithoutChii = new Hand([
  new Pon(new BambooTile(1)),
  new Pon(new BambooTile(9)),
  new Pon(new DotTile(1)),
  new Pon(new DragonTile('red')),
  new Pair(new DotTile(9))
], [])
test('chanta (outside hand) invalid without one chii', function () {
  expect(chanta.check(invalidHandWithoutChii)).toBe(0)
})

// check for terminals
var invalidHandWithSetWithoutTerminalOrHonor = new Hand([
  new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
  new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
  new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
  new Pon(new DragonTile('red')),
  new Pair(new DotTile(1))
], [])
test('chanta (outside hand) invalid hand with set without terminal or honor', function () {
  expect(chanta.check(invalidHandWithSetWithoutTerminalOrHonor)).toBe(0)
})

// check of honor tiles
var invalidHandWithSetWithoutTerminalOrHonor2 = new Hand([
  new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
  new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
  new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(1))
], [])
test('chanta (outside hand) invalid hand with set without terminal or honor', function () {
  expect(chanta.check(invalidHandWithSetWithoutTerminalOrHonor2)).toBe(0)
})
