import { expect, test } from 'vitest'
import { WindTile, DragonTile, DotTile, BambooTile, CharacterTile, NumberedTile, HonorTile, Tile, TileFactory } from '@/core/tile-classes'

// ---------------------
// dragon tile tests
// ---------------------
var dragonTile = new DragonTile('white')
test('dragon tile color', function () {
  expect(dragonTile.color).toBe('white')
})
test('dragon tile is a tile', function () {
  expect(dragonTile instanceof Tile).toBeTruthy()
})
test('dragon tile is a honor tile', function () {
  expect(dragonTile instanceof HonorTile).toBeTruthy()
})
test('dragon tile is not a numbered tile', function () {
  expect(dragonTile instanceof NumberedTile).toBeFalsy()
})
test('dragon tile is a dragon tile', function () {
  expect(dragonTile instanceof DragonTile).toBeTruthy()
})

// ---------------------
// wind tile tests
// ---------------------
var windTile = new WindTile('north')
test('wind tile direction', function () {
  expect(windTile.direction).toBe('north')
})
test('wind tile is a tile', function () {
  expect(windTile instanceof Tile).toBeTruthy()
})
test('wind tile is a honor tile', function () {
  expect(windTile instanceof HonorTile).toBeTruthy()
})
test('wind tile is not a numbered tile', function () {
  expect(windTile instanceof NumberedTile).toBeFalsy()
})
test('wind tile is a wind tile', function () {
  expect(windTile instanceof WindTile).toBeTruthy()
})

// ---------------------
// dot tile tests
// ---------------------
var dotTile = new DotTile(1)
test('dot tile number', function () {
  expect(dotTile.number).toBe(1)
})
test('dot tile is a tile', function () {
  expect(dotTile instanceof Tile).toBeTruthy()
})
test('dot tile is not a honor tile', function () {
  expect(dotTile instanceof HonorTile).toBeFalsy()
})
test('dot tile is a numbered tile', function () {
  expect(dotTile instanceof NumberedTile).toBeTruthy()
})
test('dot tile is a dot tile', function () {
  expect(dotTile instanceof DotTile).toBeTruthy()
})

// ---------------------
// character tile tests
// ---------------------
var characterTile = new CharacterTile(2)
test('character tile number', function () {
  expect(characterTile.number).toBe(2)
})
test('character tile is a tile', function () {
  expect(characterTile instanceof Tile).toBeTruthy()
})
test('character tile is not a honor tile', function () {
  expect(characterTile instanceof HonorTile).toBeFalsy()
})
test('character tile is a numbered tile', function () {
  expect(characterTile instanceof NumberedTile).toBeTruthy()
})
test('character tile is a character tile', function () {
  expect(characterTile instanceof CharacterTile).toBeTruthy()
})

// ---------------------
// bamboo tile tests
// ---------------------
var bambooTile = new BambooTile(3)
test('bamboo tile number', function () {
  expect(bambooTile.number).toBe(3)
})
test('bamboo tile is a tile', function () {
  expect(bambooTile instanceof Tile).toBeTruthy()
})
test('bamboo tile is not a honor tile', function () {
  expect(bambooTile instanceof HonorTile).toBeFalsy()
})
test('bamboo tile is a numbered tile', function () {
  expect(bambooTile instanceof NumberedTile).toBeTruthy()
})
test('bamboo tile is a bamboo tile', function () {
  expect(bambooTile instanceof BambooTile).toBeTruthy()
})

// ---------------------
// tile factory tests
// ---------------------
test('tile factory create dragon tile', function () {
  var tile = TileFactory.create('dragon', 'red')
  expect(tile instanceof DragonTile && tile.color === 'red').toBeTruthy()
})
test('tile factory create wind tile', function () {
  var tile = TileFactory.create('wind', 'south')
  expect(tile instanceof WindTile && tile.direction === 'south').toBeTruthy()
})
test('tile factory create bamboo tile', function () {
  var tile = TileFactory.create('bamboo', 5)
  expect(tile instanceof BambooTile && tile.value === 5).toBeTruthy()
})
test('tile factory create dot tile', function () {
  var tile = TileFactory.create('dot', 3)
  expect(tile instanceof DotTile && tile.value === 3).toBeTruthy()
})
test('tile factory create character tile', function () {
  var tile = TileFactory.create('character', 6)
  expect(tile instanceof CharacterTile && tile.value === 6).toBeTruthy()
})
