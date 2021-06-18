import WaitRule from '@/core/fu-calculation/rules/wait-fu-rule'
import Hand from '@/core/hand'
import { Pair, Pon, Chii } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

describe('given the wait is a single wait', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      new Pon(new DotTile(4)),
      new Pon(new DotTile(5))
    ],
    winningCombinaisonIndex: 0,
    winningTileIndex: 0
  })

  test('should return 2 fu', () => {
    const result = new WaitRule().check(hand)
    expect(result).toStrictEqual({ key: 'wait', fuValue: 2, quantity: 1 })
  })
})

describe('given the wait is a edge wait', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Pon(new DotTile(3)),
      new Pon(new DotTile(4)),
      new Pon(new DotTile(5))
    ],
    winningCombinaisonIndex: 0,
    winningTileIndex: 2
  })

  test('should return 2 fu', () => {
    const result = new WaitRule().check(hand)
    expect(result).toStrictEqual({ key: 'wait', fuValue: 2, quantity: 1 })
  })
})

describe('given the wait is a closed wait', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
      new Pon(new DotTile(3)),
      new Pon(new DotTile(4)),
      new Pon(new DotTile(5))
    ],
    winningCombinaisonIndex: 0,
    winningTileIndex: 1
  })

  test('should return 2 fu', () => {
    const result = new WaitRule().check(hand)
    expect(result).toStrictEqual({ key: 'wait', fuValue: 2, quantity: 1 })
  })
})

describe('given the wait is not a single, edge or closed wait', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      new Pon(new DotTile(4)),
      new Pon(new DotTile(5))
    ],
    winningCombinaisonIndex: 1,
    winningTileIndex: 0
  })

  test('should not return any fu info', () => {
    const result = new WaitRule().check(hand)
    expect(result).toBeUndefined()
  })
})
