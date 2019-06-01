import { Tenhou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, CharacterTile } from '@/core/tile-classes'

test('tenhou (heavenly hand) valid hand', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'east', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Tenhou().check(hand)).toBe(1)
})

test('tenhou (heavenly hand) invalid hand because it was not won during the first uninterrupted round', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'east', 'east', 0, 0, 'tsumo')

  expect(new Tenhou().check(hand)).toBe(0)
})

// This test-case in impossible in real life because a dealer can't won on a discard during the first round
test('tenhou (heavenly hand) invalid hand because it was not won by tsumo', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'east', 'east', 0, 0, 'ron')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Tenhou().check(hand)).toBe(0)
})

test('tenhou (heavenly hand) invalid hand because it was not won by the dealer (south)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'south', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Tenhou().check(hand)).toBe(0)
})

test('tenhou (heavenly hand) invalid hand because it was not won by the dealer (west)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'west', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Tenhou().check(hand)).toBe(0)
})

test('tenhou (heavenly hand) invalid hand because it was not won by the dealer (north)', () => {
  var hand = new Hand([
    new Pair(new DotTile(1)),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new CharacterTile(1)),
    new Pon(new CharacterTile(9))
  ], [], 'north', 'east', 0, 0, 'tsumo')

  hand.wonDuringFirstUninterruptedRound = true

  expect(new Tenhou().check(hand)).toBe(0)
})
