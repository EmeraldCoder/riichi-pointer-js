import ShousuushiiYaku from '@/core/han-calculation/yakus/shousuushii-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile, WindTile } from '@/core/tile-classes'

test('shousuushii (little four winds) valid hand with three pon of wind tile and a pair of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('east')),
      new Pon(new WindTile('south')),
      new Pon(new WindTile('west')),
      new Pon(new DotTile(1))
    ],
    openCombinaisons: [
      new Pon(new WindTile('north'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toStrictEqual({ key: 'shousuushii', hanValue: 0, yakumanValue: 1 })
})

test('shousuushii (little four winds) valid hand with three kan of wind tile and a pair of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('south')),
      new Kan(new WindTile('west')),
      new Kan(new WindTile('north')),
      new Pon(new DotTile(1))
    ],
    openCombinaisons: [
      new Kan(new WindTile('east'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toStrictEqual({ key: 'shousuushii', hanValue: 0, yakumanValue: 1 })
})

test('shousuushii (little four winds) valid hand with a mix of three pon/kan of wind tile and a pair of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('west')),
      new Kan(new WindTile('north')),
      new Pon(new WindTile('east')),
      new Pon(new DotTile(1))
    ],
    openCombinaisons: [
      new Kan(new WindTile('south'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toStrictEqual({ key: 'shousuushii', hanValue: 0, yakumanValue: 1 })
})

test('shousuushii (little four winds) invalid hand because it contains four pon/kan of wind tiles (big four winds)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new WindTile('north')),
      new Pon(new WindTile('east')),
      new Pon(new WindTile('west'))
    ],
    openCombinaisons: [
      new Kan(new WindTile('south'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toBeUndefined()
})

test('shousuushii (little four winds) invalid hand because it doesn\'t contains a wind pair', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new WindTile('north')),
      new Pon(new WindTile('east')),
      new Pon(new DotTile(2))
    ],
    openCombinaisons: [
      new Kan(new WindTile('south'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toBeUndefined()
})

test('shousuushii (little four winds) invalid hand because it doesn\'t contains three pon/kan of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('west')),
      new Pon(new WindTile('north')),
      new Pon(new WindTile('east')),
      new Pon(new DotTile(2))
    ],
    openCombinaisons: [
      new Kan(new DotTile(1))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toBeUndefined()
})
