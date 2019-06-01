import { DaiSuushii } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile, WindTile } from '@/core/tile-classes'

test('dai suushii (big four winds) valid hand with a pon of each wind tile', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new WindTile('east')),
    new Pon(new WindTile('south')),
    new Pon(new WindTile('west'))
  ], [
    new Pon(new WindTile('north'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSuushii().check(hand)).toBe(2)
})

test('dai suushii (big four winds) valid hand with a kan of each wind tile', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Kan(new WindTile('east')),
    new Kan(new WindTile('south')),
    new Kan(new WindTile('west'))
  ], [
    new Kan(new WindTile('north'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSuushii().check(hand)).toBe(2)
})

test('dai suushii (big four winds) valid hand with a mix of four pon/kan of wind tile', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Kan(new WindTile('east')),
    new Pon(new WindTile('south')),
    new Kan(new WindTile('west'))
  ], [
    new Pon(new WindTile('north'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSuushii().check(hand)).toBe(2)
})

test('dai suushii (big four winds) invalid hand because it does not contains four pon/kan of wind tile', () => {
  var hand = new Hand([
    new Pair(new WindTile('east')),
    new Kan(new DotTile(1)),
    new Pon(new WindTile('south')),
    new Kan(new WindTile('west'))
  ], [
    new Pon(new WindTile('north'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSuushii().check(hand)).toBe(0)
})
