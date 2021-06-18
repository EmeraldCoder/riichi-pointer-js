import DaisangenYaku from '@/core/han-calculation/yakus/daisangen-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile, DragonTile } from '@/core/tile-classes'

test('daisangen (big three dragons) valid hand with a pon of each dragon tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new DragonTile('red')),
      new Pon(new DragonTile('green')),
      new Pon(new DotTile(2))
    ],
    openCombinaisons: [
      new Pon(new DragonTile('white'))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toStrictEqual({ key: 'daisangen', hanValue: 0, yakumanValue: 1 })
})

test('daisangen (big three dragons) valid hand with a kan of each dragon tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Kan(new DragonTile('red')),
      new Kan(new DragonTile('green')),
      new Pon(new DotTile(2))
    ],
    openCombinaisons: [
      new Kan(new DragonTile('white'))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toStrictEqual({ key: 'daisangen', hanValue: 0, yakumanValue: 1 })
})

test('daisangen (big three dragons) valid hand with a mix of pon and kan of each dragon tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Kan(new DragonTile('red')),
      new Pon(new DragonTile('green')),
      new Pon(new DotTile(2))
    ],
    openCombinaisons: [
      new Kan(new DragonTile('white'))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toStrictEqual({ key: 'daisangen', hanValue: 0, yakumanValue: 1 })
})

test('daisangen (big three dragons) invalid hand because there is no pon or kan of white dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new DragonTile('red')),
      new Pon(new DragonTile('green')),
      new Pon(new DotTile(3))
    ],
    openCombinaisons: [
      new Pon(new DotTile(2))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toBeUndefined()
})

test('daisangen (big three dragons) invalid hand because there is no pon or kan of red dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new DragonTile('white')),
      new Pon(new DragonTile('green')),
      new Pon(new DotTile(3))
    ],
    openCombinaisons: [
      new Pon(new DotTile(2))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toBeUndefined()
})

test('daisangen (big three dragons) invalid hand because there is no pon or kan of green dragon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new DragonTile('white')),
      new Pon(new DragonTile('red')),
      new Pon(new DotTile(3))
    ],
    openCombinaisons: [
      new Pon(new DotTile(2))
    ]
  })

  expect(new DaisangenYaku().check(hand)).toBeUndefined()
})
