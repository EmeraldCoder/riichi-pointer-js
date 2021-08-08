import TanyaouYaku from '@/core/han-calculation/yakus/tanyao-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combination-classes'
import { DotTile, CharacterTile, BambooTile, DragonTile } from '@/core/tile-classes'

const sut = new TanyaouYaku()

const validHand = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Sequence(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('tanyaou (all simples) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'tanyao', hanValue: 1, yakumanValue: 0 })
})

const invalidHandWithHonorTile = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Sequence(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Triplet(new DragonTile('red')),
    new Pair(new DotTile(7))
  ]
})

test('tanyaou (all simples) invalid hand with honor tiles', () => {
  expect(sut.check(invalidHandWithHonorTile)).toBeUndefined()
})

const invalidHandWithTerminalTile = new Hand({
  concealedCombinations: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Sequence(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]
})

test('tanyaou (all simples) invalid hand with terminal tile', () => {
  expect(sut.check(invalidHandWithTerminalTile)).toBeUndefined()
})
