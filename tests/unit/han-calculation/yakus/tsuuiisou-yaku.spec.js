import TsuuiisouYaku from '@/core/han-calculation/yakus/tsuuiisou-yaku'
import Hand from '@/core/hand'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('tsuuiisou (all honors) valid hand with only honor tiles', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('east')),
      new Pon(new WindTile('south')),
      new Pon(new WindTile('north')),
      new Pon(new DragonTile('green'))
    ],
    openCombinaisons: [
      new Pon(new DragonTile('red'))
    ]
  })

  expect(new TsuuiisouYaku().check(hand)).toStrictEqual({ key: 'tsuuiisou', hanValue: 0, yakumanValue: 1 })
})

test('tsuuiisou (all honors) invalid hand because it contains dot tiles', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new WindTile('south')),
      new Pon(new WindTile('north')),
      new Pon(new DragonTile('green'))
    ],
    openCombinaisons: [
      new Pon(new DragonTile('red'))
    ]
  })

  expect(new TsuuiisouYaku().check(hand)).toBeUndefined()
})

test('tsuuiisou (all honors) invalid hand because it contains bamboo tiles', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new BambooTile(2)),
      new Pon(new WindTile('south')),
      new Pon(new WindTile('north')),
      new Pon(new DragonTile('green'))
    ],
    openCombinaisons: [
      new Pon(new DragonTile('red'))
    ]
  })

  expect(new TsuuiisouYaku().check(hand)).toBeUndefined()
})

test('tsuuiisou (all honors) invalid hand because it contains character tiles', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new CharacterTile(3)),
      new Pon(new WindTile('south')),
      new Pon(new WindTile('north')),
      new Pon(new DragonTile('green'))
    ],
    openCombinaisons: [
      new Pon(new DragonTile('red'))
    ]
  })

  expect(new TsuuiisouYaku().check(hand)).toBeUndefined()
})
