import ChantaYaku from '@/core/han-calculation/yakus/chanta-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

const sut = new ChantaYaku()

const validConcealedHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DragonTile('red')),
    new Pair(new DotTile(1))
  ]
})

test('chanta (outside hand) valid concealed hand', () => {
  expect(sut.check(validConcealedHand)).toStrictEqual({ key: 'chanta', hanValue: 2, yakumanValue: 0 })
})

const validOpenHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3))
  ],
  openCombinaisons: [
    new Pon(new DragonTile('red')),
    new Pair(new DotTile(1))
  ]
})

test('chanta (outside hand) valid open hand', () => {
  expect(sut.check(validOpenHand)).toStrictEqual({ key: 'chanta', hanValue: 1, yakumanValue: 0 })
})

const invalidHandWithoutChii = new Hand({
  concealedCombinaisons: [
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new DotTile(1)),
    new Pon(new DragonTile('red')),
    new Pair(new DotTile(9))
  ]
})

test('chanta (outside hand) invalid without one chii', () => {
  expect(sut.check(invalidHandWithoutChii)).toBeUndefined()
})

// check for terminals
const invalidHandWithSetWithoutTerminalOrHonor = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DragonTile('red')),
    new Pair(new DotTile(1))
  ]
})

test('chanta (outside hand) invalid hand with set without terminal or honor', () => {
  expect(sut.check(invalidHandWithSetWithoutTerminalOrHonor)).toBeUndefined()
})

// check of honor tiles
const invalidHandWithSetWithoutTerminalOrHonor2 = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DotTile(9)),
    new Pair(new DotTile(1))
  ]
})

test('chanta (outside hand) invalid hand with set without terminal or honor', () => {
  expect(sut.check(invalidHandWithSetWithoutTerminalOrHonor2)).toBeUndefined()
})
