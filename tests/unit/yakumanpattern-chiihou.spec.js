import { Chiihou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, CharacterTile } from '@/core/tile-classes'

test('chiihou (hand of earth) valid hand (south player)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'south', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Chiihou().check(hand)).toBe(1)
})

test('chiihou (hand of earth) valid hand (west player)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'west', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Chiihou().check(hand)).toBe(1)
})

test('chiihou (hand of earth) valid hand (north player)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'north', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Chiihou().check(hand)).toBe(1)
})

test('chiihou (hand of earth) invalid hand because won by the dealer', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'east', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Chiihou().check(hand)).toBe(0)
})

test('chiihou (hand of earth) invalid hand because won by tsumo', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'south', 'east', 0, 0, 'ron')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Chiihou().check(hand)).toBe(0)
})

test('chiihou (hand of earth) invalid hand because it was not won on the first uninterrupted round', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'west', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = false

  expect(new Chiihou().check(hand)).toBe(0)
})
