import SuuankouYaku from '@/core/han-calculation/yakus/suuankou-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

const sut = new SuuankouYaku()
const sutWithDoubleYakuman = new SuuankouYaku({ allowDoubleYakuman: true })

test('suuankou (four concealed pon) invalid hand because there is a chii', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      new Chii(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toBeUndefined()
})

test('suuankou (four concealed pon) invalid hand because the hand is not concealed', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3))
    ],
    openCombinaisons: [
      new Pon(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toBeUndefined()
})

test('suuankou (four concealed pon) valid hand with four concealed pon and a pair', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      new Pon(new DotTile(4)),
      new Pair(new DotTile(5))
    ]
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
})

test('suuankou (four concealed pon) valid hand with four concealed kan and a pair', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Kan(new DotTile(1)),
      new Kan(new DotTile(2)),
      new Kan(new DotTile(3)),
      new Kan(new DotTile(4)),
      new Pair(new DotTile(5))
    ]
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
})

test('suuankou (four concealed pon) valid hand with a mix of four concealed pon/kan and a pair', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pon(new DotTile(2)),
      new Kan(new DotTile(1)),
      new Kan(new DotTile(3)),
      new Pon(new DotTile(4)),
      new Pair(new DotTile(5))
    ]
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
})

test('suuankou (four concealed pon) valid hand with a single wait count as a double yakuman', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Pon(new DotTile(1)),
      new Pon(new DotTile(2)),
      new Pon(new DotTile(3)),
      new Pon(new DotTile(4))
    ],
    winningType: 'ron', // even if it's a ron
    winningCombinaisonIndex: 0,
    winningTileIndex: 0
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
  expect(sutWithDoubleYakuman.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 2 })
})

describe('given the winning tile was part of one of the ankou (concealed pon)', () => {
  const concealedCombinaisons = [
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
  ]

  test('should count as a suuankou (four concealed pon) if the hand was won by tsumo (self-draw)', () => {
    const hand = new Hand({ concealedCombinaisons, winningType: 'tsumo', winningCombinaisonIndex: 0, winningTileIndex: 0 })
    expect(sut.check(hand)).toStrictEqual({ key: 'suuankou', hanValue: 0, yakumanValue: 1 })
  })

  test('should not be eligible for suuankou (four concealed pon) if the hand was won by ron (discard)', () => {
    const hand = new Hand({ concealedCombinaisons, winningType: 'ron', winningCombinaisonIndex: 0, winningTileIndex: 0 })
    expect(sut.check(hand)).toBeUndefined()
  })
})
