import SankantsuYaku from '@/core/han-calculation/yakus/sankantsu-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

const sut = new SankantsuYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Kan(new DotTile(1)),
    new Kan(new DotTile(2)),
    new Kan(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(6))
  ]
})

test('Sankantsu (3 kans) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'sankantsu', hanValue: 2, yakumanValue: 0 })
})

const validHandWithOpenKan = new Hand({
  concealedCombinaisons: [
    new Kan(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(6))
  ],
  openCombinaisons: [
    new Kan(new DotTile(1)),
    new Kan(new DotTile(2))
  ]
})

test('Sankantsu (3 kans) valid hand with open kan', () => {
  expect(sut.check(validHandWithOpenKan)).toStrictEqual({ key: 'sankantsu', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithLessThanThreeKan = new Hand({
  concealedCombinaisons: [
    new Kan(new DotTile(1)),
    new Kan(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(6))
  ]
})

test('Sankantsu (3 kans) invalid hand with less than three kan', () => {
  expect(sut.check(invalidHandWithLessThanThreeKan)).toBeUndefined()
})
