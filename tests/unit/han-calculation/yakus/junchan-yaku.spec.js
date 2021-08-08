import JunchanYaku from '@/core/han-calculation/yakus/junchan-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combination-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

const sut = new JunchanYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Triplet(new BambooTile(9)),
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(9)),
    new Pair(new CharacterTile(1))
  ]
})

test('junchan (terminals in all sets) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'junchan', hanValue: 3, yakumanValue: 0 })
})

const invalidHandWithoutChii = new Hand({
  concealedCombinations: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(9)),
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(9)),
    new Pair(new CharacterTile(1))
  ]
})

test('junchan (terminals in all sets) invalid hand without sequence', () => {
  expect(sut.check(invalidHandWithoutChii)).toBeUndefined()
})

const invalidHandWithSetWithoutTerminal = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Triplet(new BambooTile(8)),
    new Triplet(new DotTile(1)),
    new Triplet(new DotTile(9)),
    new Pair(new CharacterTile(1))
  ]
})

test('junchan (terminals in all sets) with set without terminal', () => {
  expect(sut.check(invalidHandWithSetWithoutTerminal)).toBeUndefined()
})
