import { ChuurenPoutou } from '@/core/yakumanpattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

test('chuuren poutou (nine gates) valid hand with dot tile with a single wait', () => {
  var hand = new Hand([
    new Pon(new DotTile(1)),
    new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
    new Chii(new DotTile(5), new DotTile(6), new DotTile(7)),
    new Pair(new DotTile(8)),
    new Pon(new DotTile(9))
  ], [
  ], 'east', 'east', 2, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(1)
})

test('chuuren poutou (nine gates) valid hand with character tile with a single wait', () => {
  var hand = new Hand([
    new Pon(new CharacterTile(1)),
    new Chii(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4)),
    new Chii(new CharacterTile(5), new CharacterTile(6), new CharacterTile(7)),
    new Chii(new CharacterTile(7), new CharacterTile(8), new CharacterTile(9)),
    new Pair(new CharacterTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(1)
})

test('chuuren poutou (nine gates) valid hand with bamboo tile with a single wait', () => {
  var hand = new Hand([
    new Pair(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(1)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 1 (for the chii)', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pair(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 1 (for the pon)', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pair(new BambooTile(9))
  ], [
  ], 'east', 'east', 0, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 2', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Pair(new BambooTile(2)),
    new Chii(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
    new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 3', () => {
  var hand = new Hand([
    new Pair(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
    new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 2, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 4', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pair(new BambooTile(9))
  ], [
  ], 'east', 'east', 2, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 5', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Pair(new BambooTile(5)),
    new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 2, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 6', () => {
  var hand = new Hand([
    new Pair(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 2, 2, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 7', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pair(new BambooTile(9))
  ], [
  ], 'east', 'east', 2, 2, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 8', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
    new Pair(new BambooTile(8)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 3, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 9 (for the chii)', () => {
  var hand = new Hand([
    new Pair(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 3, 2, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) valid hand for 2 yakumans (Junsei Chuuren Poutou) because of a wait on nine tiles with the 9 (for the pon)', () => {
  var hand = new Hand([
    new Pair(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 4, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(2)
})

test('chuuren poutou (nine gates) invalid hand because not all tile are the same suit', () => {
  var hand = new Hand([
    new Pair(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pon(new CharacterTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it is not a closed hand', () => {
  var hand = new Hand([
    new Pair(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9))
  ], [
    new Pon(new BambooTile(9))
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it contains only two 1', () => {
  var hand = new Hand([
    new Pair(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 2', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
    new Chii(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pair(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 3', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Pair(new BambooTile(2)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 4', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pair(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 5', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pair(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 6', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Pair(new BambooTile(5)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 7', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Pair(new BambooTile(8)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it does not contains any 8', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(5), new BambooTile(6), new BambooTile(7)),
    new Pair(new BambooTile(7)),
    new Pon(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})

test('chuuren poutou (nine gates) invalid hand because it contains only two 9', () => {
  var hand = new Hand([
    new Pon(new BambooTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
    new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Pair(new BambooTile(9))
  ], [
  ], 'east', 'east', 1, 0, 'tsumo')
  expect(new ChuurenPoutou().check(hand)).toBe(0)
})
