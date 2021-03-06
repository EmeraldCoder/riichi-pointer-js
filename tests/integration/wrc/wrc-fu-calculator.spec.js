import WrcFuCalculator from '@/core/wrc/wrc-fu-calculator'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence, Quad } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile, WindTile, DragonTile } from '@/core/tile-classes'

const wrcCalculator = new WrcFuCalculator()

test('chiitsoitsu (seven pairs) hand should be 25 fu', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pair(new DotTile(2)),
      new Pair(new DotTile(3)),
      new Pair(new DotTile(4)),
      new Pair(new DotTile(5)),
      new Pair(new DotTile(7)),
      new Pair(new DotTile(8))
    ]
  })

  const result = wrcCalculator.calculate(hand)

  expect(result.total).toBe(25)
})

test('hand valid for open pinfu should be 30 fu', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
      new Sequence(new DotTile(3), new DotTile(4), new DotTile(5)),
      new Pair(new BambooTile(2))
    ],
    openCombinaisons: [
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Sequence(new BambooTile(5), new BambooTile(6), new BambooTile(7))
    ],
    winningCombinaisonIndex: 1,
    winningTileIndex: 0,
    winningType: 'ron'
  })

  const result = wrcCalculator.calculate(hand)

  expect(result.total).toBe(30)
})

describe('given the hand is a pinfu', () => {
  const concealedCombinaisons = [
    new Sequence(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
    new Sequence(new DotTile(3), new DotTile(4), new DotTile(5)),
    new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Sequence(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
    new Pair(new BambooTile(2))
  ]

  test('should be 20 fu if the hand was won by tsumo (self-draw)', () => {
    const hand = new Hand({ concealedCombinaisons, winningType: 'tsumo', winningCombinaisonIndex: 0, winningTileIndex: 0 })
    const result = wrcCalculator.calculate(hand)
    expect(result.total).toBe(20)
  })

  test('should be 30 fu if the hand was won by ron (discard)', () => {
    const hand = new Hand({ concealedCombinaisons, winningType: 'ron', winningCombinaisonIndex: 0, winningTileIndex: 0 })
    const result = wrcCalculator.calculate(hand)
    expect(result.total).toBe(30)
  })
})

test('test case 1', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Quad(new DotTile(3)),
      new Pair(new WindTile('east'))
    ],
    openCombinaisons: [
      new Triplet(new DotTile(8))
    ],
    winningType: 'tsumo',
    winningCombinaisonIndex: 3,
    winningTileIndex: 0,
    roundWind: 'east',
    seatWind: 'east'
  })

  const result = wrcCalculator.calculate(hand)

  expect(result).toStrictEqual({
    details: [
      { key: 'win', fuValue: 20, quantity: 1 },
      { key: 'minkou simple', fuValue: 2, quantity: 1 },
      { key: 'ankou simple', fuValue: 4, quantity: 1 },
      { key: 'ankou non simple', fuValue: 8, quantity: 1 },
      { key: 'ankan simple', fuValue: 16, quantity: 1 },
      { key: 'pair', fuValue: 2, quantity: 2 },
      { key: 'wait', fuValue: 2, quantity: 1 },
      { key: 'tsumo', fuValue: 2, quantity: 1 }
    ],
    total: 60
  })
})

test('test case 2', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DotTile(1)),
      new Triplet(new DotTile(2)),
      new Sequence(new DotTile(3), new DotTile(4), new DotTile(5)),
      new Triplet(new DotTile(8)),
      new Pair(new DragonTile('green'))
    ],
    winningType: 'ron',
    winningCombinaisonIndex: 0,
    winningTileIndex: 0,
    roundWind: 'east',
    seatWind: 'east'
  })

  const result = wrcCalculator.calculate(hand)

  expect(result).toStrictEqual({
    details: [
      { key: 'win', fuValue: 20, quantity: 1 },
      { key: 'minkou non simple', fuValue: 4, quantity: 1 },
      { key: 'ankou simple', fuValue: 4, quantity: 2 },
      { key: 'pair', fuValue: 2, quantity: 1 },
      { key: 'closed ron', fuValue: 10, quantity: 1 }
    ],
    total: 50
  })
})
