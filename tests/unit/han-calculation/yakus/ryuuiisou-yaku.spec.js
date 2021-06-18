import RyuuiisouYaku from '@/core/han-calculation/yakus/ryuuiisou-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('ryuuiisou (all green) valid hand with green dragon and bamboo (2, 3, 4, 6, 8) tiles', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DragonTile('green')),
      new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8))
    ],
    openCombinaisons: [
      new Pon(new BambooTile(2))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toStrictEqual({ key: 'ryuuiisou', hanValue: 0, yakumanValue: 1 })
})

test('ryuuiisou (all green) invalid hand because it contains a bamboo 1', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DragonTile('green')),
      new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8)),
      new Pon(new BambooTile(2))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a bamboo 5', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DragonTile('green')),
      new Pon(new BambooTile(2)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8))
    ],
    openCombinaisons: [
      new Pon(new BambooTile(5))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a bamboo 7', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DragonTile('green')),
      new Pon(new BambooTile(2)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8)),
      new Pon(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a bamboo 9', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DragonTile('green')),
      new Pon(new BambooTile(2)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8)),
      new Pon(new BambooTile(9))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a dragon red', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DragonTile('red')),
      new Pon(new BambooTile(2)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8)),
      new Pon(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a dragon white', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DragonTile('white')),
      new Pon(new BambooTile(2)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8)),
      new Pon(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a wind', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new WindTile('east')),
      new Pon(new BambooTile(2)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8)),
      new Pon(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a dot tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(1)),
      new Pon(new BambooTile(2)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8)),
      new Pon(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a character tile', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new CharacterTile(1)),
      new Pon(new BambooTile(2)),
      new Pon(new BambooTile(6)),
      new Pon(new BambooTile(8)),
      new Pon(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})
