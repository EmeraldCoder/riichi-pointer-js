import { SanAnkou } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var sanAnkou = new SanAnkou()

var validHand = new Hand([
  new Pon(new DotTile(1)),
  new Pon(new DotTile(2)),
  new Pon(new DotTile(3)),
  new Pon(new DotTile(4)),
  new Pair(new DotTile(5))
], [])
test('San Ankou (3 concealed pons) valid hand', function () {
  expect(sanAnkou.check(validHand)).toBe(2)
})

var validOpenHand = new Hand([
  new Pon(new DotTile(1)),
  new Pon(new DotTile(2)),
  new Pon(new DotTile(3)),
  new Pair(new DotTile(5))
], [
  new Pon(new DotTile(4))
], 'east', 'east', 3, 1)
test('San Ankou (3 concealed pons) valid open hand', function () {
  expect(sanAnkou.check(validOpenHand)).toBe(2)
})

var validHandWithKan = new Hand([
  new Pon(new DotTile(1)),
  new Pon(new DotTile(2)),
  new Kan(new DotTile(3)),
  new Pon(new DotTile(4)),
  new Pair(new DotTile(5))
], [])
test('San Ankou (3 concealed pons) valid hand with kan', function () {
  expect(sanAnkou.check(validHandWithKan)).toBe(2)
})

var invalidHandWithLessThanThreeConcealedPon = new Hand([
  new Pon(new DotTile(3)),
  new Pair(new DotTile(5))
], [
  new Pon(new DotTile(1)),
  new Pon(new DotTile(2)),
  new Pon(new DotTile(4))
], 'east', 'east', 1, 0)
test('San Ankou (3 concealed pons) invalid hand with less than 3 concealed pons', function () {
  expect(sanAnkou.check(invalidHandWithLessThanThreeConcealedPon)).toBe(0)
})

describe('given the third ankou (concealed triplet) is also the winning tile', () => {
  const concealedCombinaisons = [
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(4))
  ]
  const openCombinaisons = [
    new Pon(new DotTile(5))
  ]

  test('should be valid for a san ankou yaku if the hand was won by tsumo (self-draw)', () => {
    const hand = new Hand(concealedCombinaisons, openCombinaisons, 'east', 'east', 0, 0, 'tsumo')
    expect(sanAnkou.check(hand)).toBe(2)
  })

  test('should not be eligible for san ankou yaku if the hand was won by ron (discard)', () => {
    const hand = new Hand(concealedCombinaisons, openCombinaisons, 'east', 'east', 0, 0, 'ron')
    expect(sanAnkou.check(hand)).toBe(0)
  })
})
