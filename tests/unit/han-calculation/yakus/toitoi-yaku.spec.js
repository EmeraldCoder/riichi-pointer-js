import ToitoiYaku from '@/core/han-calculation/yakus/toitoi-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii, Kan } from '@/core/combinaison-classes'
import { DotTile, BambooTile } from '@/core/tile-classes'

const sut = new ToitoiYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(7)),
    new Pon(new BambooTile(4)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('toitoi (all pons) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'toitoi', hanValue: 2, yakumanValue: 0 })
})

const validHandWithKan = new Hand({
  concealedCombinaisons: [
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(7)),
    new Pon(new BambooTile(4)),
    new Kan(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('toitoi (all pons) valid hand with kan', () => {
  expect(sut.check(validHandWithKan)).toStrictEqual({ key: 'toitoi', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithoutFourPon = new Hand({
  concealedCombinaisons: [
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(7)),
    new Pon(new BambooTile(4)),
    new Chii(new DotTile(3), new DotTile(4), new DotTile(5)),
    new Pair(new DotTile(7))
  ]
})

test('toitoi (all pons) invalid hand without four pon', () => {
  expect(sut.check(invalidHandWithoutFourPon)).toBeUndefined()
})
