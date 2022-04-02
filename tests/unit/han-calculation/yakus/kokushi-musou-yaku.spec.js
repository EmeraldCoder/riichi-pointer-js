import { expect, test } from 'vitest'
import KokushiMusouYaku from '@/core/han-calculation/yakus/kokushi-musou-yaku'
import Hand from '@/core/hand'
import { Pair, Orphan } from '@/core/combination-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('kokushi musou (thirteen orphans) valid hand with single wait', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Orphan(new DragonTile('white'))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toStrictEqual({ key: 'kokushi musou', hanValue: 0, yakumanValue: 1 })
})

test('kokushi musou (thirteen orphans) valid hand with 13 waits (worth 2 yakumans)', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Orphan(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toStrictEqual({ key: 'kokushi musou', hanValue: 0, yakumanValue: 1 })
  expect(new KokushiMusouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'kokushi musou', hanValue: 0, yakumanValue: 2 })
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have a pair', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Orphan(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have 12 orphans', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Pair(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Orphan(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 1 of Dot', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(9)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 9 of Dot', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(1)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 1 of Bamboo', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(9)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 9 of Bamboo', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(1)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 1 of Character', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any 9 of Character', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any East Wind', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any South Wind', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any West Wind', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('north')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any North Wind', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('west')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any Green Dragon', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('red')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any Red Dragon', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('green')),
      new Pair(new DragonTile('white'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})

test('kokushi musou (thirtheen orphans) invalid hand because it does not have any White Dragon', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Orphan(new DotTile(1)),
      new Orphan(new DotTile(9)),
      new Orphan(new BambooTile(1)),
      new Orphan(new BambooTile(9)),
      new Orphan(new CharacterTile(1)),
      new Orphan(new CharacterTile(9)),
      new Orphan(new WindTile('east')),
      new Orphan(new WindTile('south')),
      new Orphan(new WindTile('west')),
      new Orphan(new WindTile('north')),
      new Orphan(new DragonTile('green')),
      new Orphan(new DragonTile('red')),
      new Pair(new DragonTile('red'))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new KokushiMusouYaku().check(hand)).toBeUndefined()
})
