import WrcFuCalculator from '@/core/wrc/wrc-fu-calculator'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii, Kan } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile, WindTile, DragonTile } from '@/core/tile-classes'

const wrcCalculator = new WrcFuCalculator()

test('chiitsoitsu (seven pairs) hand should be 25 fu', () => {
  const hand = new Hand(
    [
      new Pair(new DotTile(1)),
      new Pair(new DotTile(2)),
      new Pair(new DotTile(3)),
      new Pair(new DotTile(4)),
      new Pair(new DotTile(5)),
      new Pair(new DotTile(7)),
      new Pair(new DotTile(8))
    ],
    [],
    'east', 'east', 0, 0, 'tsumo'
  )

  const result = wrcCalculator.calculate(hand)

  expect(result.total).toBe(25)
})

test('hand valid for open pinfu should be 30 fu', () => {
  const hand = new Hand(
    [
      new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
      new Chii(new DotTile(3), new DotTile(4), new DotTile(5)),
      new Pair(new BambooTile(2))
    ],
    [
      new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Chii(new BambooTile(5), new BambooTile(6), new BambooTile(7))
    ],
    'east', 'east', 1, 0, 'ron'
  )

  const result = wrcCalculator.calculate(hand)

  expect(result.total).toBe(30)
})

describe('given the hand is a pinfu', () => {
  const concealedCombinaisons = [
    new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
    new Chii(new DotTile(3), new DotTile(4), new DotTile(5)),
    new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Chii(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
    new Pair(new BambooTile(2))
  ]

  test('should be 20 fu if the hand was won by tsumo (self-draw)', () => {
    const hand = new Hand(concealedCombinaisons, [], 'east', 'east', 0, 0, 'tsumo')
    const result = wrcCalculator.calculate(hand)
    expect(result.total).toBe(20)
  })

  test('should be 30 fu if the hand was won by ron (discard)', () => {
    const hand = new Hand(concealedCombinaisons, [], 'east', 'east', 0, 0, 'ron')
    const result = wrcCalculator.calculate(hand)
    expect(result.total).toBe(30)
  })
})

test('test case 1', () => {
  const hand = new Hand(
    [
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Kan(new DotTile(3)),
      new Pair(new WindTile('east'))
    ],
    [
      new Pon(new DotTile(8))
    ],
    'east', 'east', 3, 0, 'tsumo'
  )

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
  const hand = new Hand(
    [
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Chii(new DotTile(3), new DotTile(4), new DotTile(5)),
      new Pon(new DotTile(8)),
      new Pair(new DragonTile('green'))
    ],
    [],
    'east', 'east', 0, 0, 'ron'
  )

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
