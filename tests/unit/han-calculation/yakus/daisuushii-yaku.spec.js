import { expect, test } from 'vitest'
import DaisuushiiYaku from '@/core/han-calculation/yakus/daisuushii-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Quad } from '@/core/combination-classes'
import { DotTile, WindTile } from '@/core/tile-classes'

test('daisuushii (big four winds) valid hand with a triplet of each wind tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Triplet(new WindTile('east')),
      new Triplet(new WindTile('south')),
      new Triplet(new WindTile('west'))
    ],
    openCombinations: [
      new Triplet(new WindTile('north'))
    ]
  })

  expect(new DaisuushiiYaku().check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 1 })
  expect(new DaisuushiiYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 2 })
})

test('daisuushii (big four winds) valid hand with a quad of each wind tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Quad(new WindTile('east')),
      new Quad(new WindTile('south')),
      new Quad(new WindTile('west'))
    ],
    openCombinations: [
      new Quad(new WindTile('north'))
    ]
  })

  expect(new DaisuushiiYaku().check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 1 })
  expect(new DaisuushiiYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 2 })
})

test('daisuushii (big four winds) valid hand with a mix of four triplet/quad of wind tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Quad(new WindTile('east')),
      new Triplet(new WindTile('south')),
      new Quad(new WindTile('west'))
    ],
    openCombinations: [
      new Triplet(new WindTile('north'))
    ]
  })

  expect(new DaisuushiiYaku().check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 1 })
  expect(new DaisuushiiYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 2 })
})

test('daisuushii (big four winds) invalid hand because it does not contains four triplet/quad of wind tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new WindTile('east')),
      new Quad(new DotTile(1)),
      new Triplet(new WindTile('south')),
      new Quad(new WindTile('west'))
    ],
    openCombinations: [
      new Triplet(new WindTile('north'))
    ]
  })

  expect(new DaisuushiiYaku().check(hand)).toBeUndefined()
})
