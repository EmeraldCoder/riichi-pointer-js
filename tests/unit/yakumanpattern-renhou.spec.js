import { Renhou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, CharacterTile } from '@/core/tile-classes'

test('renhou (hand of man) valid hand (south)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'south', 'east', 0, 0, 'ron')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Renhou().check(hand)).toBe(1)
})

test('renhou (hand of man) valid hand (west)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'west', 'east', 0, 0, 'ron')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Renhou().check(hand)).toBe(1)
})

test('renhou (hand of man) valid hand (north)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'north', 'east', 0, 0, 'ron')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Renhou().check(hand)).toBe(1)
})

// This test-case in impossible in real life because a dealer can't won on a discard during the first round
test('renhou (hand of man) invalid hand because won by the dealder', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'east', 'east', 0, 0, 'ron')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Renhou().check(hand)).toBe(0)
})

test('renhou (hand of man) invalid hand because won by tsumo', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'south', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Renhou().check(hand)).toBe(0)
})

test('renhou (hand of man) invalid hand because not won a the first uninterrupted round', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'south', 'east', 0, 0, 'ron')

  hand.wonDuringFirstUninterruptedRound = false

  expect(new Renhou().check(hand)).toBe(0)
})
