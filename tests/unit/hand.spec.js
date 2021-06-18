import { Pair, Pon, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'
import Hand from '@/core/hand'

test('create a hand with all default values', () => {
  const hand = new Hand()

  expect(hand).toMatchObject({
    concealedCombinaisons: [],
    openCombinaisons: [],
    roundWind: 'east',
    seatWind: 'east',
    winningType: 'tsumo',
    winningCombinaisonIndex: null,
    winningTileIndex: null,
    yakus: [],
    nbDora: 0
  })

  // getters don't work in toMatchObject

  expect(hand.isOpen).toBe(false)
  expect(hand.combinaisons).toStrictEqual([])
  expect(hand.winningCombinaison).toBeNull()
  expect(hand.winningTile).toBeNull()
})

test('create a hand with options', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new DotTile(2))
    ],
    openCombinaisons: [
      new Pon(new DotTile(3)),
      new Pon(new DotTile(4)),
      new Kan(new DotTile(5))
    ],
    roundWind: 'south',
    seatWind: 'west',
    winningCombinaisonIndex: 0,
    winningTileIndex: 0,
    winningType: 'ron',
    nbDora: 1,
    yakus: ['rinshan kaihou']
  })

  expect(hand).toMatchObject({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new DotTile(2))
    ],
    openCombinaisons: [
      new Pon(new DotTile(3)),
      new Pon(new DotTile(4)),
      new Kan(new DotTile(5))
    ],
    roundWind: 'south',
    seatWind: 'west',
    winningType: 'ron',
    winningCombinaisonIndex: 0,
    winningTileIndex: 0,
    yakus: ['rinshan kaihou'],
    nbDora: 1
  })

  // getters don't work in toMatchObject

  expect(hand.isOpen).toBe(true)
  expect(hand.combinaisons).toStrictEqual([
    new Pair(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Kan(new DotTile(5))
  ])
  expect(hand.winningCombinaison).toStrictEqual(new Pair(new DotTile(1)))
  expect(hand.winningTile).toStrictEqual(new DotTile(1))
})
