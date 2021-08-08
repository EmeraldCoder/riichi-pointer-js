import ToitoiYaku from '@/core/han-calculation/yakus/toitoi-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence, Quad } from '@/core/combination-classes'
import { DotTile, BambooTile } from '@/core/tile-classes'

const sut = new ToitoiYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(7)),
    new Triplet(new BambooTile(4)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('toitoi (all pons) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'toitoi', hanValue: 2, yakumanValue: 0 })
})

const validHandWithKan = new Hand({
  concealedCombinations: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(7)),
    new Triplet(new BambooTile(4)),
    new Quad(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('toitoi (all pons) valid hand with quad', () => {
  expect(sut.check(validHandWithKan)).toStrictEqual({ key: 'toitoi', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithoutFourPon = new Hand({
  concealedCombinations: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(7)),
    new Triplet(new BambooTile(4)),
    new Sequence(new DotTile(3), new DotTile(4), new DotTile(5)),
    new Pair(new DotTile(7))
  ]
})

test('toitoi (all pons) invalid hand without four triplet', () => {
  expect(sut.check(invalidHandWithoutFourPon)).toBeUndefined()
})
