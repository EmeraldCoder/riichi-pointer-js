import { describe, expect, test } from 'vitest'
import SuuankouYaku from '@/core/han-calculation/yakus/suuankou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence, Quad } from '@/core/combination-classes'
import { DotTile } from '@/core/tile-classes'

const sut = new SuuankouYaku()
const sutWithDoubleYakuman = new SuuankouYaku({ allowDoubleYakuman: true })

test('suuankou (four concealed triplet) invalid hand because there is a sequence', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(5)),
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Triplet(new DotTile(3)),
      new Sequence(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toBeUndefined()
})

test('suuankou (four concealed triplet) invalid hand because the hand is not concealed', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(5)),
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Triplet(new DotTile(3))
    ],
    openCombinations: [
      new Triplet(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toBeUndefined()
})

test('suuankou (four concealed triplet) valid hand with four concealed triplet and a pair', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Triplet(new DotTile(3)),
      new Triplet(new DotTile(4)),
      new Pair(new DotTile(5))
    ]
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
})

test('suuankou (four concealed triplet) valid hand with four concealed quad and a pair', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Quad(new DotTile(1)),
      new Quad(new DotTile(2)),
      new Quad(new DotTile(3)),
      new Quad(new DotTile(4)),
      new Pair(new DotTile(5))
    ]
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
})

test('suuankou (four concealed triplet) valid hand with a mix of four concealed triplet/quad and a pair', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new DotTile(2)),
      new Quad(new DotTile(1)),
      new Quad(new DotTile(3)),
      new Triplet(new DotTile(4)),
      new Pair(new DotTile(5))
    ]
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
})

test('suuankou (four concealed triplet) valid hand with a single wait count as a double yakuman', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(5)),
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Triplet(new DotTile(3)),
      new Triplet(new DotTile(4))
    ],
    winningType: 'ron', // even if it's a ron
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
  expect(sutWithDoubleYakuman.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 2 })
})

describe('given the winning tile was part of one of the ankou (concealed triplet)', () => {
  const concealedCombinations = [
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(3)),
    new Triplet(new DotTile(4)),
    new Pair(new DotTile(5))
  ]

  test('should count as a suuankou (four concealed triplet) if the hand was won by tsumo (self-draw)', () => {
    const hand = new Hand({ concealedCombinations, winningType: 'tsumo', winningCombinationIndex: 0, winningTileIndex: 0 })
    expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
  })

  test('should not be eligible for suuankou (four concealed triplet) if the hand was won by ron (discard)', () => {
    const hand = new Hand({ concealedCombinations, winningType: 'ron', winningCombinationIndex: 0, winningTileIndex: 0 })
    expect(sut.check(hand)).toBeUndefined()
  })
})
