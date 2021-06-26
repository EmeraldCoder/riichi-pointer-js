import SanankouYaku from '@/core/han-calculation/yakus/sanankou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Quad } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

const sut = new SanankouYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(3)),
    new Triplet(new DotTile(4)),
    new Pair(new DotTile(5))
  ]
})
test('Sanankou (3 concealed pons) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'sanankou', hanValue: 2, yakumanValue: 0 })
})

const validOpenHand = new Hand({
  concealedCombinaisons: [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(5))
  ],
  openCombinaisons: [
    new Triplet(new DotTile(4))
  ]
})
test('Sanankou (3 concealed pons) valid open hand', () => {
  expect(sut.check(validOpenHand)).toStrictEqual({ key: 'sanankou', hanValue: 2, yakumanValue: 0 })
})

const validHandWithKan = new Hand({
  concealedCombinaisons: [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Quad(new DotTile(3)),
    new Triplet(new DotTile(4)),
    new Pair(new DotTile(5))
  ]
})
test('Sanankou (3 concealed pons) valid hand with quad', () => {
  expect(sut.check(validHandWithKan)).toStrictEqual({ key: 'sanankou', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithLessThanThreeConcealedPon = new Hand({
  concealedCombinaisons: [
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(5))
  ],
  openCombinaisons: [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(4))
  ]
})
test('Sanankou (3 concealed pons) invalid hand with less than 3 concealed pons', () => {
  expect(sut.check(invalidHandWithLessThanThreeConcealedPon)).toBeUndefined()
})

describe('given the third ankou (concealed triplet) is also the winning tile', () => {
  const concealedCombinaisons = [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(4))
  ]
  const openCombinaisons = [
    new Triplet(new DotTile(5))
  ]

  test('should be valid for a san ankou yaku if the hand was won by tsumo (self-draw)', () => {
    const hand = new Hand({ concealedCombinaisons, openCombinaisons, winningType: 'tsumo', winningCombinaisonIndex: 0, winningTileIndex: 0 })
    expect(sut.check(hand)).toStrictEqual({ key: 'sanankou', hanValue: 2, yakumanValue: 0 })
  })

  test('should not be eligible for san ankou yaku if the hand was won by ron (discard)', () => {
    const hand = new Hand({ concealedCombinaisons, openCombinaisons, winningType: 'ron', winningCombinaisonIndex: 0, winningTileIndex: 0 })
    expect(sut.check(hand)).toBeUndefined()
  })
})
