import ShousuushiiYaku from '@/core/han-calculation/yakus/shousuushii-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Quad } from '@/core/combinaison-classes'
import { DotTile, WindTile } from '@/core/tile-classes'

test('shousuushii (little four winds) valid hand with three triplet of wind tile and a pair of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('east')),
      new Triplet(new WindTile('south')),
      new Triplet(new WindTile('west')),
      new Triplet(new DotTile(1))
    ],
    openCombinaisons: [
      new Triplet(new WindTile('north'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toStrictEqual({ key: 'shousuushii', hanValue: 0, yakumanValue: 1 })
})

test('shousuushii (little four winds) valid hand with three quad of wind tile and a pair of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('south')),
      new Quad(new WindTile('west')),
      new Quad(new WindTile('north')),
      new Triplet(new DotTile(1))
    ],
    openCombinaisons: [
      new Quad(new WindTile('east'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toStrictEqual({ key: 'shousuushii', hanValue: 0, yakumanValue: 1 })
})

test('shousuushii (little four winds) valid hand with a mix of three triplet/quad of wind tile and a pair of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('west')),
      new Quad(new WindTile('north')),
      new Triplet(new WindTile('east')),
      new Triplet(new DotTile(1))
    ],
    openCombinaisons: [
      new Quad(new WindTile('south'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toStrictEqual({ key: 'shousuushii', hanValue: 0, yakumanValue: 1 })
})

test('shousuushii (little four winds) invalid hand because it contains four triplet/quad of wind tiles (big four winds)', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Triplet(new WindTile('north')),
      new Triplet(new WindTile('east')),
      new Triplet(new WindTile('west'))
    ],
    openCombinaisons: [
      new Quad(new WindTile('south'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toBeUndefined()
})

test('shousuushii (little four winds) invalid hand because it doesn\'t contains a wind pair', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Triplet(new WindTile('north')),
      new Triplet(new WindTile('east')),
      new Triplet(new DotTile(2))
    ],
    openCombinaisons: [
      new Quad(new WindTile('south'))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toBeUndefined()
})

test('shousuushii (little four winds) invalid hand because it doesn\'t contains three triplet/quad of wind tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('west')),
      new Triplet(new WindTile('north')),
      new Triplet(new WindTile('east')),
      new Triplet(new DotTile(2))
    ],
    openCombinaisons: [
      new Quad(new DotTile(1))
    ]
  })

  expect(new ShousuushiiYaku().check(hand)).toBeUndefined()
})
