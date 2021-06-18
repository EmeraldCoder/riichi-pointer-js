import DaisuushiiYaku from '@/core/han-calculation/yakus/daisuushii-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile, WindTile } from '@/core/tile-classes'

test('daisuushii (big four winds) valid hand with a pon of each wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new WindTile('east')),
      new Pon(new WindTile('south')),
      new Pon(new WindTile('west'))
    ],
    openCombinaisons: [
      new Pon(new WindTile('north'))
    ]
  })

  expect(new DaisuushiiYaku().check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 1 })
  expect(new DaisuushiiYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 2 })
})

test('daisuushii (big four winds) valid hand with a kan of each wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Kan(new WindTile('east')),
      new Kan(new WindTile('south')),
      new Kan(new WindTile('west'))
    ],
    openCombinaisons: [
      new Kan(new WindTile('north'))
    ]
  })

  expect(new DaisuushiiYaku().check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 1 })
  expect(new DaisuushiiYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 2 })
})

test('daisuushii (big four winds) valid hand with a mix of four pon/kan of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Kan(new WindTile('east')),
      new Pon(new WindTile('south')),
      new Kan(new WindTile('west'))
    ],
    openCombinaisons: [
      new Pon(new WindTile('north'))
    ]
  })

  expect(new DaisuushiiYaku().check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 1 })
  expect(new DaisuushiiYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'daisuushii', hanValue: 0, yakumanValue: 2 })
})

test('daisuushii (big four winds) invalid hand because it does not contains four pon/kan of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('east')),
      new Kan(new DotTile(1)),
      new Pon(new WindTile('south')),
      new Kan(new WindTile('west'))
    ],
    openCombinaisons: [
      new Pon(new WindTile('north'))
    ]
  })

  expect(new DaisuushiiYaku().check(hand)).toBeUndefined()
})
