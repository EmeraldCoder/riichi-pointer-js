import PinfuYaku from '@/core/han-calculation/yakus/pinfu-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence, Quad } from '@/core/combinaison-classes'
import { DotTile, DragonTile, WindTile } from '@/core/tile-classes'

const sut = new PinfuYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DotTile(9))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 0
})

test('pinfu (all sequence / no point) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'pinfu', hanValue: 1, yakumanValue: 0 })
})

const invalidHandWithDragonPair = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DragonTile('red'))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 0
})

test('pinfu (all sequence / no point) invalid hand with a dragon pair', () => {
  expect(sut.check(invalidHandWithDragonPair)).toBeUndefined()
})

const invalidHandWithSeatWindPair = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new WindTile('east'))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 0,
  roundWind: 'east',
  seatWind: 'south'
})

test('pinfu (all sequence / no point) invalid hand with a seat wind pair', () => {
  expect(sut.check(invalidHandWithSeatWindPair)).toBeUndefined()
})

const invalidHandWithPrevalentWindPair = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new WindTile('south'))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 0,
  roundWind: 'east',
  seatWind: 'south'
})
test('pinfu (all sequence / no point) invalid hand with a prevalent wind pair', () => {
  expect(sut.check(invalidHandWithPrevalentWindPair)).toBeUndefined()
})

const invalidHandWithPon = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Triplet(new DotTile(7)),
    new Pair(new DotTile(9))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 0
})

test('pinfu (all sequence / no point) invalid hand with a triplet', () => {
  expect(sut.check(invalidHandWithPon)).toBeUndefined()
})

const invalidHandWithKan = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Quad(new DotTile(7)),
    new Pair(new DotTile(9))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 0
})

test('pinfu (all sequence / no point) invalid hand with a quad', () => {
  expect(sut.check(invalidHandWithKan)).toBeUndefined()
})

const invalidHandWhenOpen = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DotTile(9))
  ],
  openCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 0
})

test('pinfu (all sequence / no point) invalid hand when open', () => {
  expect(sut.check(invalidHandWhenOpen)).toBeUndefined()
})

const invalidHandWithEdgeWait = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DotTile(9))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 2
})

test('pinfu (all sequence / no point) invalid hand with an edge wait', () => {
  expect(sut.check(invalidHandWithEdgeWait)).toBeUndefined()
})

const invalidHandWithClosedWait = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DotTile(9))
  ],
  winningCombinaisonIndex: 0,
  winningTileIndex: 1
})

test('pinfu (all sequence / no point) invalid hand with a closed wait', () => {
  expect(sut.check(invalidHandWithClosedWait)).toBeUndefined()
})

const invalidHandWithSingleWait = new Hand({
  concealedCombinaisons: [
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Sequence(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DotTile(9))
  ],
  winningCombinaisonIndex: 4,
  winningTileIndex: 0
})

test('pinfu (all sequence / no point) invalid hand with a single wait', () => {
  expect(sut.check(invalidHandWithSingleWait)).toBeUndefined()
})
