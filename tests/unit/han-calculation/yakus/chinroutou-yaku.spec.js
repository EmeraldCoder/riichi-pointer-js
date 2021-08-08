import ChinroutouYaku from '@/core/han-calculation/yakus/chinroutou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair } from '@/core/combination-classes'
import { DotTile, BambooTile, DragonTile, WindTile, CharacterTile } from '@/core/tile-classes'

test('chinroutou (all terminals) valid hand with only teminal tiles', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(1)),
      new Triplet(new BambooTile(1)),
      new Triplet(new BambooTile(9)),
      new Triplet(new CharacterTile(1))
    ],
    openCombinations: [
      new Triplet(new CharacterTile(9))
    ]
  })

  expect(new ChinroutouYaku().check(hand)).toStrictEqual({ key: 'chinroutou', hanValue: 0, yakumanValue: 1 })
})

test('chinroutou (all terminals) invalid hand because it contains a dragon tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DragonTile('green')),
      new Triplet(new BambooTile(1)),
      new Triplet(new BambooTile(9)),
      new Triplet(new CharacterTile(1))
    ],
    openCombinations: [
      new Triplet(new CharacterTile(9))
    ]
  })

  expect(new ChinroutouYaku().check(hand)).toBeUndefined()
})

test('chinroutou (all terminals) invalid hand because it contains a wind tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new WindTile('east')),
      new Triplet(new BambooTile(1)),
      new Triplet(new BambooTile(9)),
      new Triplet(new CharacterTile(1))
    ],
    openCombinations: [
      new Triplet(new CharacterTile(9))
    ]
  })

  expect(new ChinroutouYaku().check(hand)).toBeUndefined()
})

test('chinroutou (all terminals) invalid hand because it contains a non terminal numbered tile', () => {
  const hand = new Hand({
    concealedCombinations: [
      new Pair(new DotTile(2)),
      new Triplet(new BambooTile(1)),
      new Triplet(new BambooTile(9)),
      new Triplet(new CharacterTile(1))
    ],
    openCombinations: [
      new Triplet(new CharacterTile(9))
    ]
  })

  expect(new ChinroutouYaku().check(hand)).toBeUndefined()
})
