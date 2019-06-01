import { RyuuIisou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('ryuu iisou (all green) valid hand with green dragon and bamboo (2, 3, 4, 6, 8) tiles', () => {
  var hand = new Hand([
    new Pair(new DragonTile('green')),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8))
  ], [
    new Pon(new BambooTile(2))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(1)
})

test('ryuu iisou (all green) invalid hand because it contains a bamboo 1', () => {
  var hand = new Hand([
    new Pair(new DragonTile('green')),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8)),
    new Pon(new BambooTile(2))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})

test('ryuu iisou (all green) invalid hand because it contains a bamboo 5', () => {
  var hand = new Hand([
    new Pair(new DragonTile('green')),
    new Pon(new BambooTile(2)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8))
  ], [
    new Pon(new BambooTile(5))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})

test('ryuu iisou (all green) invalid hand because it contains a bamboo 7', () => {
  var hand = new Hand([
    new Pair(new DragonTile('green')),
    new Pon(new BambooTile(2)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8)),
    new Pon(new BambooTile(7))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})

test('ryuu iisou (all green) invalid hand because it contains a bamboo 9', () => {
  var hand = new Hand([
    new Pair(new DragonTile('green')),
    new Pon(new BambooTile(2)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8)),
    new Pon(new BambooTile(9))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})

test('ryuu iisou (all green) invalid hand because it contains a dragon red', () => {
  var hand = new Hand([
    new Pair(new DragonTile('red')),
    new Pon(new BambooTile(2)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8)),
    new Pon(new BambooTile(7))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})

test('ryuu iisou (all green) invalid hand because it contains a dragon white', () => {
  var hand = new Hand([
    new Pair(new DragonTile('white')),
    new Pon(new BambooTile(2)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8)),
    new Pon(new BambooTile(7))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})

test('ryuu iisou (all green) invalid hand because it contains a wind', () => {
  var hand = new Hand([
    new Pair(new WindTile('east')),
    new Pon(new BambooTile(2)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8)),
    new Pon(new BambooTile(7))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})

test('ryuu iisou (all green) invalid hand because it contains a dot tile', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(2)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8)),
    new Pon(new BambooTile(7))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})

test('ryuu iisou (all green) invalid hand because it contains a character tile', () => {
  var hand = new Hand([
    new Pair(new CharacterTile(1)),
    new Pon(new BambooTile(2)),
    new Pon(new BambooTile(6)),
    new Pon(new BambooTile(8)),
    new Pon(new BambooTile(7))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new RyuuIisou().check(hand)).toBe(0)
})
