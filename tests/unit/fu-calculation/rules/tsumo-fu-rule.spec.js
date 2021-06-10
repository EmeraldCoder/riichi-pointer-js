import TsumoRule from '@/core/fu-calculation/rules/tsumo-fu-rule'
import { Hand } from '@/core/hand-classes'
import { Pair } from '@/core/combinaison-classes'
import { DotTile, DragonTile, WindTile } from '@/core/tile-classes'

function makeDefaultHand (winningType) {
  return new Hand(
    [
      new Pair(new DragonTile('green')),
      new Pair(new DragonTile('red')),
      new Pair(new DragonTile('white')),
      new Pair(new WindTile('east')),
      new Pair(new DotTile(5)),
      new Pair(new DotTile(6)),
      new Pair(new DotTile(7))
    ],
    [],
    'east', 'east', 0, 0, winningType
  )
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
