import { KokushiMusou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pair, Orphan } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('kokushi musou (thirteen orphans) valid hand with single wait', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Orphan(new DragonTile('white'))
  ], [], 'east', 'east', 1, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(1)
})

test('kokushi musou (thirteen orphans) valid hand with 13 waits (worth 2 yakumans)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Orphan(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(2)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have a pair', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Orphan(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have 12 orphans', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pair(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Orphan(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 1 of Dot', () => {
  var hand = new Hand([
    new Orphan(new DotTile(9)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 9 of Dot', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(1)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 1 of Bamboo', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(9)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 9 of Bamboo', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(1)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 1 of Character', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 9 of Character', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any East Wind', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any South Wind', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any West Wind', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('north')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any North Wind', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('west')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any Green Dragon', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('red')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any Red Dragon', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('green')),
    new Pair(new DragonTile('white'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any White Dragon', () => {
  var hand = new Hand([
    new Orphan(new DotTile(1)),
    new Orphan(new DotTile(9)),
    new Orphan(new BambooTile(1)),
    new Orphan(new BambooTile(9)),
    new Orphan(new CharacterTile(1)),
    new Orphan(new CharacterTile(9)),
    new Orphan(new WindTile('east')),
    new Orphan(new WindTile('south')),
    new Orphan(new WindTile('west')),
    new Orphan(new WindTile('north')),
    new Orphan(new DragonTile('green')),
    new Orphan(new DragonTile('red')),
    new Pair(new DragonTile('red'))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(new KokushiMusou().check(hand)).toBe(0)
})
