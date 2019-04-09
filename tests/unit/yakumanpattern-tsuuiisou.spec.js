import { TsuuIisou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('tsuu iisou (all honors) valid hand with only honor tiles', () => {
  var hand = new Hand([
    new Pair(new WindTile('east')),
    new Pon(new WindTile('south')),
    new Pon(new WindTile('north')),
    new Pon(new DragonTile('green'))
  ], [
    new Pon(new DragonTile('red'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new TsuuIisou().check(hand)).toBe(1)
})

test('tsuu iisou (all honors) invalid hand because it contains dot tiles', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new WindTile('south')),
    new Pon(new WindTile('north')),
    new Pon(new DragonTile('green'))
  ], [
    new Pon(new DragonTile('red'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new TsuuIisou().check(hand)).toBe(0)
})

test('tsuu iisou (all honors) invalid hand because it contains bamboo tiles', () => {
  var hand = new Hand([
    new Pair(new BambooTile(2)),
    new Pon(new WindTile('south')),
    new Pon(new WindTile('north')),
    new Pon(new DragonTile('green'))
  ], [
    new Pon(new DragonTile('red'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new TsuuIisou().check(hand)).toBe(0)
})

test('tsuu iisou (all honors) invalid hand because it contains character tiles', () => {
  var hand = new Hand([
    new Pair(new CharacterTile(3)),
    new Pon(new WindTile('south')),
    new Pon(new WindTile('north')),
    new Pon(new DragonTile('green'))
  ], [
    new Pon(new DragonTile('red'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new TsuuIisou().check(hand)).toBe(0)
})
