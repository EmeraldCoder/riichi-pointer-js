import { expect, test } from 'vitest'
import { Pair, Triplet, Quad, Sequence, Orphan, Combination, CombinationFactory } from '@/core/combination-classes'
import { WindTile, DragonTile, DotTile, BambooTile, TileFactory } from '@/core/tile-classes'

// pair test
var pair = new Pair(new DragonTile('green'))
test('pair is a combination', function () {
  expect(pair instanceof Combination).toBeTruthy()
})
test('pair is a pair', function () {
  expect(pair instanceof Pair).toBeTruthy()
})
test('pair has two tiles', function () {
  expect(pair.tiles.length).toBe(2)
})
test('pair has two green dragon', function () {
  expect(pair.tiles[0] instanceof DragonTile && pair.tiles[0].color === 'green').toBeTruthy()
  expect(pair.tiles[1] instanceof DragonTile && pair.tiles[1].color === 'green').toBeTruthy()
})

// triplet test
var triplet = new Triplet(new WindTile('south'))
test('triplet is a combination', function () {
  expect(triplet instanceof Combination).toBeTruthy()
})
test('triplet is a triplet', function () {
  expect(triplet instanceof Triplet).toBeTruthy()
})
test('triplet has three tiles', function () {
  expect(triplet.tiles.length).toBe(3)
})
test('triplet has three south wind', function () {
  expect(triplet.tiles[0] instanceof WindTile && triplet.tiles[0].direction === 'south').toBeTruthy()
  expect(triplet.tiles[1] instanceof WindTile && triplet.tiles[1].direction === 'south').toBeTruthy()
  expect(triplet.tiles[2] instanceof WindTile && triplet.tiles[2].direction === 'south').toBeTruthy()
})

// quad test
var quad = new Quad(new DotTile(1))
test('quad is a combination', function () {
  expect(quad instanceof Combination).toBeTruthy()
})
test('quad is a quad', function () {
  expect(quad instanceof Quad).toBeTruthy()
})
test('quad has four tiles', function () {
  expect(quad.tiles.length).toBe(4)
})
test('quad has four 1 of dot', function () {
  expect(quad.tiles[0] instanceof DotTile && quad.tiles[0].number === 1).toBeTruthy()
  expect(quad.tiles[1] instanceof DotTile && quad.tiles[1].number === 1).toBeTruthy()
  expect(quad.tiles[2] instanceof DotTile && quad.tiles[2].number === 1).toBeTruthy()
  expect(quad.tiles[3] instanceof DotTile && quad.tiles[3].number === 1).toBeTruthy()
})

// sequence test
var sequence = new Sequence(new BambooTile(4), new BambooTile(5), new BambooTile(6))
test('sequence is a combination', function () {
  expect(sequence instanceof Combination).toBeTruthy()
})
test('sequence is a sequence', function () {
  expect(sequence instanceof Sequence).toBeTruthy()
})
test('sequence has three tiles', function () {
  expect(sequence.tiles.length).toBe(3)
})
test('sequence has 4,5,6 of bamboo', function () {
  expect(sequence.tiles[0] instanceof BambooTile && sequence.tiles[0].number === 4).toBeTruthy()
  expect(sequence.tiles[1] instanceof BambooTile && sequence.tiles[1].number === 5).toBeTruthy()
  expect(sequence.tiles[2] instanceof BambooTile && sequence.tiles[2].number === 6).toBeTruthy()
})

// orphan test
var orphan = new Orphan(new BambooTile(1))
test('orphan is a combination', function () {
  expect(orphan instanceof Combination).toBeTruthy()
})
test('orphan is a orphan', function () {
  expect(orphan instanceof Orphan).toBeTruthy()
})
test('orphan has one tile', function () {
  expect(orphan.tiles.length).toBe(1)
})
test('orphan has 1 of bamboo', function () {
  expect(orphan.tiles[0] instanceof BambooTile && orphan.tiles[0].number === 1).toBeTruthy()
})

// factory test
test('CombinationFactory create pair', function () {
  var combination = CombinationFactory.create('pair', TileFactory.create('dot', 1))
  expect(combination instanceof Pair).toBeTruthy()
  expect(combination.tiles[0] instanceof DotTile && combination.tiles[0].value === 1).toBeTruthy()
  expect(combination.tiles[1] instanceof DotTile && combination.tiles[1].value === 1).toBeTruthy()
})
test('CombinationFactory create triplet', function () {
  var combination = CombinationFactory.create('triplet', TileFactory.create('dot', 1))
  expect(combination instanceof Triplet).toBeTruthy()
  expect(combination.tiles[0] instanceof DotTile && combination.tiles[0].value === 1).toBeTruthy()
  expect(combination.tiles[1] instanceof DotTile && combination.tiles[1].value === 1).toBeTruthy()
  expect(combination.tiles[2] instanceof DotTile && combination.tiles[2].value === 1).toBeTruthy()
})
test('CombinationFactory create quad', function () {
  var combination = CombinationFactory.create('quad', TileFactory.create('dot', 1))
  expect(combination instanceof Quad).toBeTruthy()
  expect(combination.tiles[0] instanceof DotTile && combination.tiles[0].value === 1).toBeTruthy()
  expect(combination.tiles[1] instanceof DotTile && combination.tiles[1].value === 1).toBeTruthy()
  expect(combination.tiles[2] instanceof DotTile && combination.tiles[2].value === 1).toBeTruthy()
  expect(combination.tiles[3] instanceof DotTile && combination.tiles[3].value === 1).toBeTruthy()
})
test('CombinationFactory create sequence', function () {
  var combination = CombinationFactory.create('sequence', TileFactory.create('dot', 1))
  expect(combination instanceof Sequence).toBeTruthy()
  expect(combination.tiles[0] instanceof DotTile && combination.tiles[0].value === 1).toBeTruthy()
  expect(combination.tiles[1] instanceof DotTile && combination.tiles[1].value === 2).toBeTruthy()
  expect(combination.tiles[2] instanceof DotTile && combination.tiles[2].value === 3).toBeTruthy()
})
test('CombinationFactory create orphan', function () {
  var combination = CombinationFactory.create('orphan', TileFactory.create('dot', 1))
  expect(combination instanceof Orphan).toBeTruthy()
  expect(combination.tiles[0] instanceof DotTile && combination.tiles[0].value === 1).toBeTruthy()
})
