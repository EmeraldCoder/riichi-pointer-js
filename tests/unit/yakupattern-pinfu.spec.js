import { Pinfu } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii, Kan } from '@/core/combinaison-classes'
import { DotTile, DragonTile, WindTile } from '@/core/tile-classes'

var pinfu = new Pinfu()

var validHand = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pair(new DotTile(9))
], [], 'east', 'south', 0, 0)
test('pinfu (all chii / no point) valid hand', function () {
  expect(pinfu.check(validHand)).toBe(1)
})

var invalidHandWithDragonPair = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pair(new DragonTile('red'))
], [], 'east', 'south', 0, 0)
test('pinfu (all chii / no point) invalid hand with a dragon pair', function () {
  expect(pinfu.check(invalidHandWithDragonPair)).toBe(0)
})

var invalidHandWithSeatWindPair = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pair(new WindTile('east'))
], [], 'east', 'south', 0, 0)
test('pinfu (all chii / no point) invalid hand with a seat wind pair', function () {
  expect(pinfu.check(invalidHandWithSeatWindPair)).toBe(0)
})

var invalidHandWithPrevalentWindPair = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pair(new WindTile('south'))
], [], 'east', 'south', 0, 0)
test('pinfu (all chii / no point) invalid hand with a prevalent wind pair', function () {
  expect(pinfu.check(invalidHandWithPrevalentWindPair)).toBe(0)
})

var invalidHandWithPon = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pon(new DotTile(7)),
  new Pair(new DotTile(9))
], [], 'east', 'south', 0, 0)
test('pinfu (all chii / no point) invalid hand with a pon', function () {
  expect(pinfu.check(invalidHandWithPon)).toBe(0)
})

var invalidHandWithKan = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Kan(new DotTile(7)),
  new Pair(new DotTile(9))
], [], 'east', 'south', 0, 0)
test('pinfu (all chii / no point) invalid hand with a kan', function () {
  expect(pinfu.check(invalidHandWithKan)).toBe(0)
})

var invalidHandWhenOpen = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pair(new DotTile(9))
], [
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3))
], 'east', 'south', 0, 0)
test('pinfu (all chii / no point) invalid hand when open', function () {
  expect(pinfu.check(invalidHandWhenOpen)).toBe(0)
})

var invalidHandWithEdgeWait = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pair(new DotTile(9))
], [], 'east', 'south', 0, 2)
test('pinfu (all chii / no point) invalid hand with an edge wait', function () {
  expect(pinfu.check(invalidHandWithEdgeWait)).toBe(0)
})

var invalidHandWithClosedWait = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pair(new DotTile(9))
], [], 'east', 'south', 0, 1)
test('pinfu (all chii / no point) invalid hand with a closed wait', function () {
  expect(pinfu.check(invalidHandWithClosedWait)).toBe(0)
})

var invalidHandWithSingleWait = new Hand([
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
  new Pair(new DotTile(9))
], [], 'east', 'south', 4, 0)
test('pinfu (all chii / no point) invalid hand with a single wait', function () {
  expect(pinfu.check(invalidHandWithSingleWait)).toBe(0)
})
