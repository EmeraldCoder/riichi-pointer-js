import JunchanYaku from '@/core/han-calculation/yakus/junchan-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

const sut = new JunchanYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new BambooTile(9)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(9)),
    new Pair(new CharacterTile(1))
  ]
})

test('junchan (terminals in all sets) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'junchan', hanValue: 3, yakumanValue: 0 })
})

const invalidHandWithoutChii = new Hand({
  concealedCombinaisons: [
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(9)),
    new Pair(new CharacterTile(1))
  ]
})

test('junchan (terminals in all sets) invalid hand without chii', () => {
  expect(sut.check(invalidHandWithoutChii)).toBeUndefined()
})

const invalidHandWithSetWithoutTerminal = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new BambooTile(8)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(9)),
    new Pair(new CharacterTile(1))
  ]
})

test('junchan (terminals in all sets) with set without terminal', () => {
  expect(sut.check(invalidHandWithSetWithoutTerminal)).toBeUndefined()
})
