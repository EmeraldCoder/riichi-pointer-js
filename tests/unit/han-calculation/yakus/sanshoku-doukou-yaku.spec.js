import SanshokuDokouYaku from '@/core/han-calculation/yakus/sanshoku-doukou-yaku'
import Hand from '@/core/hand'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

const sut = new SanshokuDokouYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Pon(new BambooTile(1)),
    new Pon(new DotTile(1)),
    new Pon(new CharacterTile(1)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku dokou (triple pon) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'sanshoku doukou', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithoutThreeSamePon = new Hand({
  concealedCombinaisons: [
    new Pon(new BambooTile(1)),
    new Pon(new DotTile(1)),
    new Pon(new CharacterTile(2)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('sanshoku dokou (triple pon) invalid hand without three same pon', () => {
  expect(sut.check(invalidHandWithoutThreeSamePon)).toBeUndefined()
})
