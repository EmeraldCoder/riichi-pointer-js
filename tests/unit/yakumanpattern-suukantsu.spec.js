import { SuuKantsu } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var suuKantsu = new SuuKantsu()

test('suu kantsu (four kans) invalid hand because there is a pon', () => {
  var hand = new Hand([
    new Pair(new DotTile(5)),
    new Kan(new DotTile(1)),
    new Kan(new DotTile(2)),
    new Kan(new DotTile(3)),
    new Pon(new DotTile(4))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(suuKantsu.check(hand)).toBe(0)
})

test('suu kantsu (four kans) invalid hand because there is a chii', () => {
  var hand = new Hand([
    new Pair(new DotTile(5)),
    new Kan(new DotTile(1)),
    new Kan(new DotTile(2)),
    new Kan(new DotTile(3)),
    new Chii(new DotTile(4))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(suuKantsu.check(hand)).toBe(0)
})

test('suu kantsu (four kans) valid hand with four open/concealed kans', () => {
  var hand = new Hand([
    new Pair(new DotTile(5)),
    new Kan(new DotTile(1)),
    new Kan(new DotTile(2)),
    new Kan(new DotTile(3))
  ], [
    new Kan(new DotTile(4))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(suuKantsu.check(hand)).toBe(1)
})
