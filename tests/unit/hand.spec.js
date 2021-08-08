import { Pair, Triplet, Quad } from '@/core/combination-classes'
import { DotTile } from '@/core/tile-classes'
import Hand from '@/core/hand'

test('create a hand with all default values', () => {
  const hand = new Hand()

  expect(hand).toMatchObject({
    concealedCombinations: [],
    openCombinations: [],
    roundWind: 'east',
    seatWind: 'east',
    winningType: 'tsumo',
    winningCombinationIndex: null,
    winningTileIndex: null,
    yakus: [],
    nbDora: 0
  })

  // getters don't work in toMatchObject

  expect(hand.isOpen).toBe(false)
  expect(hand.combinations).toStrictEqual([])
  expect(hand.winningCombination).toBeNull()
  expect(hand.winningTile).toBeNull()
})

test('create a hand with options', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Triplet(new DotTile(2))
    ],
    openCombinations: [
      new Triplet(new DotTile(3)),
      new Triplet(new DotTile(4)),
      new Quad(new DotTile(5))
    ],
    roundWind: 'south',
    seatWind: 'west',
    winningCombinationIndex: 0,
    winningTileIndex: 0,
    winningType: 'ron',
    nbDora: 1,
    yakus: ['rinshan kaihou']
  })

  expect(hand).toMatchObject({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Triplet(new DotTile(2))
    ],
    openCombinations: [
      new Triplet(new DotTile(3)),
      new Triplet(new DotTile(4)),
      new Quad(new DotTile(5))
    ],
    roundWind: 'south',
    seatWind: 'west',
    winningType: 'ron',
    winningCombinationIndex: 0,
    winningTileIndex: 0,
    yakus: ['rinshan kaihou'],
    nbDora: 1
  })

  // getters don't work in toMatchObject

  expect(hand.isOpen).toBe(true)
  expect(hand.combinations).toStrictEqual([
    new Pair(new DotTile(1)),
    new Triplet(new DotTile(2)),
    new Triplet(new DotTile(3)),
    new Triplet(new DotTile(4)),
    new Quad(new DotTile(5))
  ])
  expect(hand.winningCombination).toStrictEqual(new Pair(new DotTile(1)))
  expect(hand.winningTile).toStrictEqual(new DotTile(1))
})
