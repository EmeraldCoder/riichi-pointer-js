import { SanKanTsu } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var sanKanTsu = new SanKanTsu()

var validHand = new Hand([
  new Kan(new DotTile(1)),
  new Kan(new DotTile(2)),
  new Kan(new DotTile(3)),
  new Pon(new DotTile(4)),
  new Pair(new DotTile(6))
], [])
test('San Kan Tsu (3 kans) valid hand', function () {
  expect(sanKanTsu.check(validHand)).toBe(2)
})

var validHandWithOpenKan = new Hand([
  new Kan(new DotTile(3)),
  new Pon(new DotTile(4)),
  new Pair(new DotTile(6))
], [
  new Kan(new DotTile(1)),
  new Kan(new DotTile(2))
])
test('San Kan Tsu (3 kans) valid hand with open kan', function () {
  expect(sanKanTsu.check(validHandWithOpenKan)).toBe(2)
})

var invalidHandWithLessThanThreeKan = new Hand([
  new Kan(new DotTile(1)),
  new Kan(new DotTile(2)),
  new Pon(new DotTile(3)),
  new Pon(new DotTile(4)),
  new Pair(new DotTile(6))
], [])
test('San Kan Tsu (3 kans) invalid hand with less than three kan', function () {
  expect(sanKanTsu.check(invalidHandWithLessThanThreeKan)).toBe(0)
})
