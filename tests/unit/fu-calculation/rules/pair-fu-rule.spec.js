import PairRule from '@/core/fu-calculation/rules/pair-fu-rule'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, DragonTile, WindTile } from '@/core/tile-classes'

function makeDefaultHand(pair, roundWind, seatWind) {
  return new Hand([
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      pair
    ], [
      new Pon(new DotTile(4))
    ],
    roundWind ?? 'east', seatWind ?? 'east', 0, 0, 'tsumo'
  )
}

describe('given the hand have more than one pair (ex.: chiitoitsu)', () => {
  const hand = new Hand(
    [
      new Pair(new DragonTile('green')),
      new Pair(new DragonTile('red')),
      new Pair(new DragonTile('white')),
      new Pair(new WindTile('east')),
      new Pair(new DotTile(5)),
      new Pair(new DotTile(6)),
      new Pair(new DotTile(7))
    ],
    [ ],
    'east', 'east', 1, 0, 'tsumo'
  )

  test('should not return any fu info', () => {
    const result = new PairRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the pair is a simple tile', () => {
  const hand = makeDefaultHand(new Pair(new DotTile(4)))

  test('should not return any fu info', () => {
    const result = new PairRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the pair is a terminal tile', () => {
  const hand = makeDefaultHand(new Pair(new DotTile(9)))

  test('should not return any fu info', () => {
    const result = new PairRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the pair is a not the round or seat wind', () => {
  const hand = makeDefaultHand(new Pair(new WindTile('north')), 'east', 'south')

  test('should not return any fu info', () => {
    const result = new PairRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the pair is the round wind', () => {
  const hand = makeDefaultHand(new Pair(new WindTile('east')), 'east', 'south')

  test('should return 2 fu', () => {
    const result = new PairRule().check(hand)
    expect(result).toStrictEqual({ key: 'pair', fuValue: 2, quantity: 1 })
  })
})

describe('given the pair is the seat wind', () => {
  const hand = makeDefaultHand(new Pair(new WindTile('south')), 'east', 'south')

  test('should return 2 fu', () => {
    const result = new PairRule().check(hand)
    expect(result).toStrictEqual({ key: 'pair', fuValue: 2, quantity: 1 })
  })
})

describe('given the pair is both the round and seat wind', () => {
  const hand = makeDefaultHand(new Pair(new WindTile('east')), 'east', 'east')

  test('should return 4 fu by default', () => {
    const result = new PairRule().check(hand)
    expect(result).toStrictEqual({ key: 'pair', fuValue: 2, quantity: 2 })
  })

  test('should return 2 fu if the stackable rule option is set to false', () => {
    const result = new PairRule({ stackable: false }).check(hand)
    expect(result).toStrictEqual({ key: 'pair', fuValue: 2, quantity: 1 })
  })
})

describe('given the pair is a green dragon', () => {
  const hand = makeDefaultHand(new Pair(new DragonTile('green')))

  test('should return 2 fu', () => {
    const result = new PairRule().check(hand)
    expect(result).toStrictEqual({ key: 'pair', fuValue: 2, quantity: 1 })
  })
})

describe('given the pair is a red dragon', () => {
  const hand = makeDefaultHand(new Pair(new DragonTile('red')))

  test('should return 2 fu', () => {
    const result = new PairRule().check(hand)
    expect(result).toStrictEqual({ key: 'pair', fuValue: 2, quantity: 1 })
  })
})

describe('given the pair is a white dragon', () => {
  const hand = makeDefaultHand(new Pair(new DragonTile('white')))

  test('should return 2 fu', () => {
    const result = new PairRule().check(hand)
    expect(result).toStrictEqual({ key: 'pair', fuValue: 2, quantity: 1 })
  })
})
