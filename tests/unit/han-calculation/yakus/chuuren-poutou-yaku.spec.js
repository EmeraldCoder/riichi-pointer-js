import { expect, test } from 'vitest'
import ChuurenPoutouYaku from '@/core/han-calculation/yakus/chuuren-poutou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combination-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

test('chuuren poutou (nine gates) valid hand with dot tile with a single wait', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new DotTile(1)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7)),
      new Pair(new DotTile(8)),
      new Triplet(new DotTile(9))
    ],
    winningCombinationIndex: 2,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
})

test('chuuren poutou (nine gates) valid hand with character tile with a single wait', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new CharacterTile(1)),
      new Sequence(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4)),
      new Sequence(new CharacterTile(5), new CharacterTile(6), new CharacterTile(7)),
      new Sequence(new CharacterTile(7), new CharacterTile(8), new CharacterTile(9)),
      new Pair(new CharacterTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
})

test('chuuren poutou (nine gates) valid hand with bamboo tile with a single wait', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 1 (for the sequence)', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Pair(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 1 (for the triplet)', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Pair(new BambooTile(9))
    ],
    winningCombinationIndex: 0,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 2', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Pair(new BambooTile(2)),
      new Sequence(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
      new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 3', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
      new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 2,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 4', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Pair(new BambooTile(9))
    ],
    winningCombinationIndex: 2,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 5', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Pair(new BambooTile(5)),
      new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 2,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 6', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 2,
    winningTileIndex: 2
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 7', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Sequence(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Pair(new BambooTile(9))
    ],
    winningCombinationIndex: 2,
    winningTileIndex: 2
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 8', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Sequence(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
      new Pair(new BambooTile(8)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 3,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 9 (for the sequence)', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 3,
    winningTileIndex: 2
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 9 (for the triplet)', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 4,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 1 })
  expect(new ChuurenPoutouYaku({ allowDoubleYakuman: true }).check(hand)).toStrictEqual({ key: 'chuuren poutou', hanValue: 0, yakumanValue: 2 })
})

test('chuuren poutou (nine gates) invalid hand because not all tile are the same suit', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Triplet(new CharacterTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it is not a closed hand', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9))
    ],
    openCombinations: [
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it contains only two 1', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Sequence(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 2', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
      new Sequence(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Pair(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 3', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Pair(new BambooTile(2)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 4', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Pair(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 5', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Pair(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 6', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Pair(new BambooTile(5)),
      new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 7', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Pair(new BambooTile(8)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 8', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
      new Sequence(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
      new Pair(new BambooTile(7)),
      new Triplet(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})

test('chuuren poutou (nine gates) invalid hand because it contains only two 9', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Triplet(new BambooTile(1)),
      new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
      new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
      new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
      new Pair(new BambooTile(9))
    ],
    winningCombinationIndex: 1,
    winningTileIndex: 0
  })

  expect(new ChuurenPoutouYaku().check(hand)).toBeUndefined()
})
