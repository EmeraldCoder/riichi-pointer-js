import { RinshanKaihou } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var rinshanKaihou = new RinshanKaihou()

test('rinshan kaihou (After Kan) valid hand', function () {
  var hand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Kan(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'tsumo', 'rinshan kaihou')
  expect(rinshanKaihou.check(hand)).toBe(1)
})

test('rinshan kaihou (After Kan) invalid hand', function () {
  var hand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Kan(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(rinshanKaihou.check(hand)).toBe(0)
})
