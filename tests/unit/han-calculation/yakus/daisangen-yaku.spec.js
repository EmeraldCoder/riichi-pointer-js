import DaisangenYaku from '@/core/han-calculation/yakus/daisangen-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Quad } from '@/core/combinaison-classes'
import { DotTile, DragonTile } from '@/core/tile-classes'

test('daisangen (big three dragons) valid hand with a triplet of each dragon tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Triplet(new DragonTile('red')),
      new Triplet(new DragonTile('green')),
      new Triplet(new DotTile(2))
    ],
    openCombinaisons: [
      new Triplet(new DragonTile('white'))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toStrictEqual({ key: 'daisangen', hanValue: 0, yakumanValue: 1 })
})

test('daisangen (big three dragons) valid hand with a quad of each dragon tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Quad(new DragonTile('red')),
      new Quad(new DragonTile('green')),
      new Triplet(new DotTile(2))
    ],
    openCombinaisons: [
      new Quad(new DragonTile('white'))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toStrictEqual({ key: 'daisangen', hanValue: 0, yakumanValue: 1 })
})

test('daisangen (big three dragons) valid hand with a mix of triplet and quad of each dragon tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Quad(new DragonTile('red')),
      new Triplet(new DragonTile('green')),
      new Triplet(new DotTile(2))
    ],
    openCombinaisons: [
      new Quad(new DragonTile('white'))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toStrictEqual({ key: 'daisangen', hanValue: 0, yakumanValue: 1 })
})

test('daisangen (big three dragons) invalid hand because there is no triplet or quad of white dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Triplet(new DragonTile('red')),
      new Triplet(new DragonTile('green')),
      new Triplet(new DotTile(3))
    ],
    openCombinaisons: [
      new Triplet(new DotTile(2))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toBeUndefined()
})

test('daisangen (big three dragons) invalid hand because there is no triplet or quad of red dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Triplet(new DragonTile('white')),
      new Triplet(new DragonTile('green')),
      new Triplet(new DotTile(3))
    ],
    openCombinaisons: [
      new Triplet(new DotTile(2))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toBeUndefined()
})

test('daisangen (big three dragons) invalid hand because there is no triplet or quad of green dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Triplet(new DragonTile('white')),
      new Triplet(new DragonTile('red')),
      new Triplet(new DotTile(3))
    ],
    openCombinaisons: [
      new Triplet(new DotTile(2))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toBeUndefined()
})
