import ChantaYaku from '@/core/han-calculation/yakus/chanta-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

const sut = new ChantaYaku()

const validConcealedHand = new Hand({
  concealedCombinaisons: [
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Triplet(new DragonTile('red')),
    new Pair(new DotTile(1))
  ]
})

test('chanta (outside hand) valid concealed hand', () => {
  expect(sut.check(validConcealedHand)).toStrictEqual({ key: 'chanta', hanValue: 2, yakumanValue: 0 })
})

const validOpenHand = new Hand({
  concealedCombinaisons: [
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3))
  ],
  openCombinaisons: [
    new Triplet(new DragonTile('red')),
    new Pair(new DotTile(1))
  ]
})

test('chanta (outside hand) valid open hand', () => {
  expect(sut.check(validOpenHand)).toStrictEqual({ key: 'chanta', hanValue: 1, yakumanValue: 0 })
})

const invalidHandWithoutChii = new Hand({
  concealedCombinaisons: [
    new Triplet(new BambooTile(1)),
    new Triplet(new BambooTile(9)),
    new Triplet(new DotTile(1)),
    new Triplet(new DragonTile('red')),
    new Pair(new DotTile(9))
  ]
})

test('chanta (outside hand) invalid without one sequence', () => {
  expect(sut.check(invalidHandWithoutChii)).toBeUndefined()
})

// check for terminals
const invalidHandWithSetWithoutTerminalOrHonor = new Hand({
  concealedCombinaisons: [
    new Sequence(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Triplet(new DragonTile('red')),
    new Pair(new DotTile(1))
  ]
})

test('chanta (outside hand) invalid hand with set without terminal or honor', () => {
  expect(sut.check(invalidHandWithSetWithoutTerminalOrHonor)).toBeUndefined()
})

// check of honor tiles
const invalidHandWithSetWithoutTerminalOrHonor2 = new Hand({
  concealedCombinaisons: [
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Sequence(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Sequence(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Triplet(new DotTile(9)),
    new Pair(new DotTile(1))
  ]
})

test('chanta (outside hand) invalid hand with set without terminal or honor', () => {
  expect(sut.check(invalidHandWithSetWithoutTerminalOrHonor2)).toBeUndefined()
})
