import ChiiToitsuYaku from '@/core/han-calculation/yakus/chiitoitsu-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair } from '@/core/combinaison-classes'
import { BambooTile } from '@/core/tile-classes'

const sut = new ChiiToitsuYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Pair(new BambooTile(1)),
    new Pair(new BambooTile(2)),
    new Pair(new BambooTile(3)),
    new Pair(new BambooTile(4)),
    new Pair(new BambooTile(5)),
    new Pair(new BambooTile(6)),
    new Pair(new BambooTile(7))
  ]
})
test('chiitoitsu (seven pairs) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'chiitoitsu', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithoutSevenPairs = new Hand({
  concealedCombinaisons: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(2)),
    new Triplet(new BambooTile(3)),
    new Triplet(new BambooTile(4)),
    new Pair(new BambooTile(5))
  ]
})
test('chiitoitsu (seven pairs) invalid hand without seven pairs', () => {
  expect(sut.check(invalidHandWithoutSevenPairs)).toBeUndefined()
})
