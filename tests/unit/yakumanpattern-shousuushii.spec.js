import { ShouSuushii } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile, WindTile } from '@/core/tile-classes'

test('shou suushii (little four winds) valid hand with three pon of wind tile and a pair of wind tile', () => {
  var hand = new Hand([
    new Pair(new WindTile('east')),
    new Pon(new WindTile('south')),
    new Pon(new WindTile('west')),
    new Pon(new DotTile(1))
  ], [
    new Pon(new WindTile('north'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ShouSuushii().check(hand)).toBe(1)
})

test('shou suushii (little four winds) valid hand with three kan of wind tile and a pair of wind tile', () => {
  var hand = new Hand([
    new Pair(new WindTile('south')),
    new Kan(new WindTile('west')),
    new Kan(new WindTile('north')),
    new Pon(new DotTile(1))
  ], [
    new Kan(new WindTile('east'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ShouSuushii().check(hand)).toBe(1)
})

test('shou suushii (little four winds) valid hand with a mix of three pon/kan of wind tile and a pair of wind tile', () => {
  var hand = new Hand([
    new Pair(new WindTile('west')),
    new Kan(new WindTile('north')),
    new Pon(new WindTile('east')),
    new Pon(new DotTile(1))
  ], [
    new Kan(new WindTile('south'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ShouSuushii().check(hand)).toBe(1)
})

test('shou suushii (little four winds) invalid hand because it contains four pon/kan of wind tiles (big four winds)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new WindTile('north')),
    new Pon(new WindTile('east')),
    new Pon(new WindTile('west'))
  ], [
    new Kan(new WindTile('south'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ShouSuushii().check(hand)).toBe(0)
})

test('shou suushii (little four winds) invalid hand because it doesn\'t contains a wind pair', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new WindTile('north')),
    new Pon(new WindTile('east')),
    new Pon(new DotTile(2))
  ], [
    new Kan(new WindTile('south'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ShouSuushii().check(hand)).toBe(0)
})

test('shou suushii (little four winds) invalid hand because it doesn\'t contains three pon/kan of wind tile', () => {
  var hand = new Hand([
    new Pair(new WindTile('west')),
    new Pon(new WindTile('north')),
    new Pon(new WindTile('east')),
    new Pon(new DotTile(2))
  ], [
    new Kan(new DotTile(1))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ShouSuushii().check(hand)).toBe(0)
})
