import RyuuiisouYaku from '@/core/han-calculation/yakus/ryuuiisou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combination-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('ryuuiisou (all green) valid hand with green dragon and bamboo (2, 3, 4, 6, 8) tiles', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DragonTile('green')),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8))
    ],
    openCombinations: [
      new Triplet(new BambooTile(2))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toStrictEqual({ key: 'ryuuiisou', hanValue: 0, yakumanValue: 1 })
})

test('ryuuiisou (all green) invalid hand because it contains a bamboo 1', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DragonTile('green')),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8)),
      new Triplet(new BambooTile(2))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a bamboo 5', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DragonTile('green')),
      new Triplet(new BambooTile(2)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8))
    ],
    openCombinations: [
      new Triplet(new BambooTile(5))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a bamboo 7', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DragonTile('green')),
      new Triplet(new BambooTile(2)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8)),
      new Triplet(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a bamboo 9', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DragonTile('green')),
      new Triplet(new BambooTile(2)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8)),
      new Triplet(new BambooTile(9))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a dragon red', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DragonTile('red')),
      new Triplet(new BambooTile(2)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8)),
      new Triplet(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a dragon white', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DragonTile('white')),
      new Triplet(new BambooTile(2)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8)),
      new Triplet(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a wind', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new WindTile('east')),
      new Triplet(new BambooTile(2)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8)),
      new Triplet(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a dot tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Triplet(new BambooTile(2)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8)),
      new Triplet(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})

test('ryuuiisou (all green) invalid hand because it contains a character tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new CharacterTile(1)),
      new Triplet(new BambooTile(2)),
      new Triplet(new BambooTile(6)),
      new Triplet(new BambooTile(8)),
      new Triplet(new BambooTile(7))
    ]
  })

  expect(new RyuuiisouYaku().check(hand)).toBeUndefined()
})
