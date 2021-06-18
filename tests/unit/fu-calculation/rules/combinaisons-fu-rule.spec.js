import CombinaisonsRule from '@/core/fu-calculation/rules/combinaisons-fu-rule'
import Hand from '@/core/hand'
import { Pon, Pair, Chii, Kan } from '@/core/combinaison-classes'
import { DotTile, DragonTile, WindTile } from '@/core/tile-classes'

describe('given the hand have only chii and one pair', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Pair(new DotTile(9))
    ]
  })

  test('should not return any fu info', () => {
    const result = new CombinaisonsRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the hand have only pairs (chiitoitsu)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pair(new DotTile(2)),
      new Pair(new DotTile(3)),
      new Pair(new DotTile(4)),
      new Pair(new DotTile(5)),
      new Pair(new DotTile(6)),
      new Pair(new DotTile(7))
    ]
  })

  test('should not return any fu info', () => {
    const result = new CombinaisonsRule().check(hand)
    expect(result).toBeUndefined()
  })
})

describe('given the hand have open pon of simple tile (2 to 8)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Pon(new DotTile(5)),
      new Pon(new DotTile(6))
    ]
  })

  test('should return 2 fu for each one', () => {
    const result = new CombinaisonsRule().check(hand)
    expect(result).toStrictEqual([{ key: 'minkou simple', fuValue: 2, quantity: 2 }])
  })
})

describe('given the hand have concealed pon of simple tile (2 to 8)', () => {
  const concealedCombinaisons = [
    new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pon(new DotTile(5)),
    new Pon(new DotTile(6)),
    new Pair(new DotTile(9))
  ]

  test('should return 4 fu for each one', () => {
    const hand = new Hand({ concealedCombinaisons, winningType: 'tsumo', winningCombinaisonIndex: 4, winningTileIndex: 0 })
    const result = new CombinaisonsRule().check(hand)
    expect(result).toStrictEqual([{ key: 'ankou simple', fuValue: 4, quantity: 2 }])
  })

  describe('and given the winning tile is part of one of those pon', () => {
    test('should count as concealed and return 4 fu for it if the hand was won by tsumo', () => {
      const hand = new Hand({ concealedCombinaisons, winningType: 'tsumo', winningCombinaisonIndex: 2, winningTileIndex: 0 })
      const result = new CombinaisonsRule().check(hand)
      expect(result).toStrictEqual([{ key: 'ankou simple', fuValue: 4, quantity: 2 }])
    })

    test('should count as open and return 2 fu for it if the hand was won by ron', () => {
      const hand = new Hand({ concealedCombinaisons, winningType: 'ron', winningCombinaisonIndex: 2, winningTileIndex: 0 })
      const result = new CombinaisonsRule().check(hand)
      expect(result).toStrictEqual([
        { key: 'minkou simple', fuValue: 2, quantity: 1 },
        { key: 'ankou simple', fuValue: 4, quantity: 1 }
      ])
    })
  })
})

describe('given the hand have open pon of terminal or honor tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Pon(new DotTile(1)),
      new Pon(new DotTile(9)),
      new Pon(new DragonTile('green')),
      new Pon(new WindTile('east'))
    ]
  })

  test('should return 4 fu for each one', () => {
    const result = new CombinaisonsRule().check(hand)
    expect(result).toStrictEqual([{ key: 'minkou non simple', fuValue: 4, quantity: 4 }])
  })
})

describe('given the hand have concealed pon of terminal or honor tile', () => {
  const concealedCombinaisons = [
    new Pon(new DotTile(1)),
    new Pon(new DotTile(9)),
    new Pon(new DragonTile('green')),
    new Pon(new WindTile('east')),
    new Pair(new DotTile(9))
  ]

  test('should return 8 fu for each one', () => {
    const hand = new Hand({ concealedCombinaisons, winningType: 'tsumo', winningCombinaisonIndex: 4, winningTileIndex: 0 })
    const result = new CombinaisonsRule().check(hand)
    expect(result).toStrictEqual([{ key: 'ankou non simple', fuValue: 8, quantity: 4 }])
  })

  describe('and given the winning tile is part of one of those pon', () => {
    test('should count as concealed and return 8 fu for it if the hand was won by tsumo', () => {
      const hand = new Hand({ concealedCombinaisons, winningType: 'tsumo', winningCombinaisonIndex: 0, winningTileIndex: 0 })
      const result = new CombinaisonsRule().check(hand)
      expect(result).toStrictEqual([{ key: 'ankou non simple', fuValue: 8, quantity: 4 }])
    })

    test('should count as open and return 4 fu for it if the hand was won by ron', () => {
      const hand = new Hand({ concealedCombinaisons, winningType: 'ron', winningCombinaisonIndex: 0, winningTileIndex: 0 })
      const result = new CombinaisonsRule().check(hand)
      expect(result).toStrictEqual([
        { key: 'minkou non simple', fuValue: 4, quantity: 1 },
        { key: 'ankou non simple', fuValue: 8, quantity: 3 }
      ])
    })
  })
})

describe('given the hand have open kan of simple tile (2 to 8)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Kan(new DotTile(5)),
      new Kan(new DotTile(6))
    ]
  })

  test('should return 8 fu for each one', () => {
    const result = new CombinaisonsRule().check(hand)
    expect(result).toStrictEqual([{ key: 'minkan simple', fuValue: 8, quantity: 2 }])
  })
})

describe('given the hand have concealed kan of simple tile (2 to 8)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Kan(new DotTile(5)),
      new Kan(new DotTile(6)),
      new Pair(new DotTile(9))
    ]
  })

  test('should return 16 fu for each one', () => {
    const result = new CombinaisonsRule().check(hand)
    expect(result).toStrictEqual([{ key: 'ankan simple', fuValue: 16, quantity: 2 }])
  })
})

describe('given the hand have open kan of terminal or honor tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(9))
    ],
    openCombinaisons: [
      new Kan(new DotTile(1)),
      new Kan(new DotTile(9)),
      new Kan(new DragonTile('green')),
      new Kan(new WindTile('east'))
    ]
  })

  test('should return 16 fu for each one', () => {
    const result = new CombinaisonsRule().check(hand)
    expect(result).toStrictEqual([{ key: 'minkan non simple', fuValue: 16, quantity: 4 }])
  })
})

describe('given the hand have concealed kan of terminal or honor tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Kan(new DotTile(1)),
      new Kan(new DotTile(9)),
      new Kan(new DragonTile('green')),
      new Kan(new WindTile('east')),
      new Pair(new DotTile(9))
    ]
  })

  test('should return 32 fu for each one', () => {
    const result = new CombinaisonsRule().check(hand)
    expect(result).toStrictEqual([{ key: 'ankan non simple', fuValue: 32, quantity: 4 }])
  })
})
