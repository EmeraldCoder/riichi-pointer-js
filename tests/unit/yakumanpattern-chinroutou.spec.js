import { ChinRoutou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('chin routou (all terminals) valid hand with only teminal tiles', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1))
  ], [
    new Pon(new CharacterTile(9))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ChinRoutou().check(hand)).toBe(1)
})

test('chin routou (all terminals) invalid hand because it contains a dragon tile', () => {
  var hand = new Hand([
    new Pair(new DragonTile('green')),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1))
  ], [
    new Pon(new CharacterTile(9))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ChinRoutou().check(hand)).toBe(0)
})

test('chin routou (all terminals) invalid hand because it contains a wind tile', () => {
  var hand = new Hand([
    new Pair(new WindTile('east')),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1))
  ], [
    new Pon(new CharacterTile(9))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ChinRoutou().check(hand)).toBe(0)
})

test('chin routou (all terminals) invalid hand because it contains a non terminal numbered tile', () => {
  var hand = new Hand([
    new Pair(new DotTile(2)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1))
  ], [
    new Pon(new CharacterTile(9))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ChinRoutou().check(hand)).toBe(0)
})
