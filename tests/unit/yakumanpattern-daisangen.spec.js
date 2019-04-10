import { DaiSangen } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile, DragonTile } from '@/core/tile-classes'

test('dai sangen (big three dragons) valid hand with a pon of each dragon tile', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new DragonTile('red')),
    new Pon(new DragonTile('green')),
    new Pon(new DotTile(2))
  ], [
    new Pon(new DragonTile('white'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSangen().check(hand)).toBe(1)
})

test('dai sangen (big three dragons) valid hand with a kan of each dragon tile', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Kan(new DragonTile('red')),
    new Kan(new DragonTile('green')),
    new Pon(new DotTile(2))
  ], [
    new Kan(new DragonTile('white'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSangen().check(hand)).toBe(1)
})

test('dai sangen (big three dragons) valid hand with a mix of pon and kan of each dragon tile', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Kan(new DragonTile('red')),
    new Pon(new DragonTile('green')),
    new Pon(new DotTile(2))
  ], [
    new Kan(new DragonTile('white'))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSangen().check(hand)).toBe(1)
})

test('dai sangen (big three dragons) invalid hand because there is no pon or kan of white dragon', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new DragonTile('red')),
    new Pon(new DragonTile('green')),
    new Pon(new DotTile(3))
  ], [
    new Pon(new DotTile(2))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSangen().check(hand)).toBe(0)
})

test('dai sangen (big three dragons) invalid hand because there is no pon or kan of red dragon', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new DragonTile('white')),
    new Pon(new DragonTile('green')),
    new Pon(new DotTile(3))
  ], [
    new Pon(new DotTile(2))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSangen().check(hand)).toBe(0)
})

test('dai sangen (big three dragons) invalid hand because there is no pon or kan of green dragon', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new DragonTile('white')),
    new Pon(new DragonTile('red')),
    new Pon(new DotTile(3))
  ], [
    new Pon(new DotTile(2))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new DaiSangen().check(hand)).toBe(0)
})
