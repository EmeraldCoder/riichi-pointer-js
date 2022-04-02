import { describe, expect, test } from 'vitest'
import TsumoRule from '@/core/fu-calculation/rules/tsumo-fu-rule'
import Hand from '@/core/hand'
import { Pair, Triplet } from '@/core/combination-classes'
import { DotTile, DragonTile, WindTile } from '@/core/tile-classes'

function makeDefaultHand (winningType) {
  return new Hand({
    concealedCombinations: [
      new Triplet(new DragonTile('green')),
      new Triplet(new DragonTile('red')),
      new Triplet(new DragonTile('white')),
      new Triplet(new WindTile('east')),
      new Pair(new DotTile(5))
    ],
    winningType
  })
}

describe('given the hand was won by tsumo (self-draw)', () => {
  const hand = makeDefaultHand('tsumo')

  test('should return 2 fu', () => {
    const result = new TsumoRule().check(hand)
    expect(result).toStrictEqual({ key: 'tsumo', fuValue: 2, quantity: 1 })
  })
})

describe('given the hand was won by ron', () => {
  const hand = makeDefaultHand('ron')

  test('should not return any fu info', () => {
    const result = new TsumoRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the hand contains no excluded yaku and was won by tsumo', () => {
  const hand = makeDefaultHand('tsumo')

  const mockExcludedYakuPatterns = [
    { check: () => false },
    { check: () => false }
  ]

  test('should return 2 fu', () => {
    const result = new TsumoRule({ excludedYakuPatterns: mockExcludedYakuPatterns }).check(hand)
    expect(result).toStrictEqual({ key: 'tsumo', fuValue: 2, quantity: 1 })
  })
})

describe('given the hand contains one or more excluded yaku', () => {
  const hand = makeDefaultHand('tsumo')

  const mockExcludedYakuPatterns = [
    { check: () => false },
    { check: () => true }
  ]

  test('should not return any fu info', () => {
    const result = new TsumoRule({ excludedYakuPatterns: mockExcludedYakuPatterns }).check(hand)
    expect(result).toBeUndefined()
  })
})
