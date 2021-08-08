import SanshokuDokouYaku from '@/core/han-calculation/yakus/sanshoku-doukou-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair } from '@/core/combination-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

const sut = new SanshokuDokouYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Triplet(new BambooTile(1)),
    new Triplet(new DotTile(1)),
    new Triplet(new CharacterTile(1)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku dokou (triple triplet) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'sanshoku doukou', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithoutThreeSamePon = new Hand({
  concealedCombinations: [
    new Triplet(new BambooTile(1)),
    new Triplet(new DotTile(1)),
    new Triplet(new CharacterTile(2)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku dokou (triple triplet) invalid hand without three same triplet', () => {
  expect(sut.check(invalidHandWithoutThreeSamePon)).toBeUndefined()
})
