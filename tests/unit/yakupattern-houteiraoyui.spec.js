import { HouteiRaoyui } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var houteiRaoyui = new HouteiRaoyui()

test('houtei raoyui (Last Tile Discard) valid hand', function () {
  var hand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'ron', 'houtei raoyui')
  expect(houteiRaoyui.check(hand)).toBe(1)
})

test('haitei raoyue (Last Tile Discard) invalid hand', function () {
  var hand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'ron')
  expect(houteiRaoyui.check(hand)).toBe(0)
})
