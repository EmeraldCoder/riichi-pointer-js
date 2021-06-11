import { SuuAnkou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var suuAnkou = new SuuAnkou()

test('suu ankou (four concealed pon) invalid hand because there is a chii', () => {
  var hand = new Hand([
    new Pair(new DotTile(5)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Chii(new DotTile(4))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(suuAnkou.check(hand)).toBe(0)
})

test('suu ankou (four concealed pon) invalid hand because the hand is not concealed', () => {
  var hand = new Hand([
    new Pair(new DotTile(5)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3))
  ], [
    new Pon(new DotTile(4))
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(suuAnkou.check(hand)).toBe(0)
})

test('suu ankou (four concealed pon) valid hand with four concealed pon and a pair', () => {
  var hand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(suuAnkou.check(hand)).toBe(1)
})

test('suu ankou (four concealed pon) valid hand with four concealed kan and a pair', () => {
  var hand = new Hand([
    new Kan(new DotTile(1)),
    new Kan(new DotTile(2)),
    new Kan(new DotTile(3)),
    new Kan(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(suuAnkou.check(hand)).toBe(1)
})

test('suu ankou (four concealed pon) valid hand with a mix of four concealed pon/kan and a pair', () => {
  var hand = new Hand([
    new Pon(new DotTile(2)),
    new Kan(new DotTile(1)),
    new Kan(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
  ], [], 'east', 'east', 0, 0, 'tsumo')
  expect(suuAnkou.check(hand)).toBe(1)
})

test('suu ankou (four concealed pon) valid hand with a single wait count as a double yakuman', () => {
  var hand = new Hand([
    new Pair(new DotTile(5)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4))
  ], [], 'east', 'east', 0, 0, 'ron') // even if it's a ron
  expect(suuAnkou.check(hand)).toBe(2)
})

describe('given the winning tile was part of one of the ankou (concealed pon)', () => {
  const concealedCombinaisons = [
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
  ]

  test('should count as a suu ankou (four concealed pon) if the hand was won by tsumo (self-draw)', () => {
    const hand = new Hand(concealedCombinaisons, [], 'east', 'east', 0, 0, 'tsumo')
    expect(suuAnkou.check(hand)).toBe(1)
  })

  test('should not be eligible for suu ankou (four concealed pon) if the hand was won by ron (discard)', () => {
    const hand = new Hand(concealedCombinaisons, [], 'east', 'east', 0, 0, 'ron')
    expect(suuAnkou.check(hand)).toBe(0)
  })
})
