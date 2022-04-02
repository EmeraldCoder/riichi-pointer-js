import { describe, expect, test } from 'vitest'
import SanankouYaku from '@/core/han-calculation/yakus/sanankou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Quad } from '@/core/combination-classes'
import { DotTile } from '@/core/tile-classes'

const sut = new SanankouYaku()

const validHand = new Hand({
  concealedCombinations: [
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
  concealedCombinations: [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(5))
  ],
  openCombinations: [
    new Triplet(new DotTile(4))
  ]
})
test('Sanankou (3 concealed pons) valid open hand', () => {
  expect(sut.check(validOpenHand)).toStrictEqual({ key: 'sanankou', hanValue: 2, yakumanValue: 0 })
})

const validHandWithKan = new Hand({
  concealedCombinations: [
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
  concealedCombinations: [
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(5))
  ],
  openCombinations: [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(4))
  ]
})
test('Sanankou (3 concealed pons) invalid hand with less than 3 concealed pons', () => {
  expect(sut.check(invalidHandWithLessThanThreeConcealedPon)).toBeUndefined()
})

describe('given the third ankou (concealed triplet) is also the winning tile', () => {
  const concealedCombinations = [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(4))
  ]
  const openCombinations = [
    new Triplet(new DotTile(5))
  ]

  test('should be valid for a san ankou yaku if the hand was won by tsumo (self-draw)', () => {
    const hand = new Hand({ concealedCombinations, openCombinations, winningType: 'tsumo', winningCombinationIndex: 0, winningTileIndex: 0 })
    expect(sut.check(hand)).toStrictEqual({ key: 'sanankou', hanValue: 2, yakumanValue: 0 })
  })

  test('should not be eligible for san ankou yaku if the hand was won by ron (discard)', () => {
    const hand = new Hand({ concealedCombinations, openCombinations, winningType: 'ron', winningCombinationIndex: 0, winningTileIndex: 0 })
    expect(sut.check(hand)).toBeUndefined()
  })
})
