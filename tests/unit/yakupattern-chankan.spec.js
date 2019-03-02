import { ChanKan } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var chanKan = new ChanKan()

test('chan kan (Robbing the kan) valid hand', function () {
  var hand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'ron', 'chan kan')
  expect(chanKan.check(hand)).toBe(1)
})

test('chan kan (Robbing the kan) invalid hand', function () {
  var hand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'ron')
  expect(chanKan.check(hand)).toBe(0)
})
