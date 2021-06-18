import { DefaultRuleset } from '@/core/ruleset-classes'
import {
  DragonTile,
  WindTile,
  BambooTile,
  CharacterTile,
  DotTile
} from '@/core/tile-classes'

test('default ruleset return valid available tile list', () => {
  const tiles = new DefaultRuleset().getAvailableTiles()

  expect(tiles.length).toBe(34)
  expect(tiles.filter(x => x instanceof DragonTile && x.color === 'green').length).toBe(1)
  expect(tiles.filter(x => x instanceof DragonTile && x.color === 'red').length).toBe(1)
  expect(tiles.filter(x => x instanceof DragonTile && x.color === 'white').length).toBe(1)
  expect(tiles.filter(x => x instanceof WindTile && x.direction === 'east').length).toBe(1)
  expect(tiles.filter(x => x instanceof WindTile && x.direction === 'south').length).toBe(1)
  expect(tiles.filter(x => x instanceof WindTile && x.direction === 'west').length).toBe(1)
  expect(tiles.filter(x => x instanceof WindTile && x.direction === 'north').length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 1).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 2).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 3).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 4).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 5).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 6).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 7).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 8).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 9).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 1).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 2).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 3).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 4).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 5).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 6).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 7).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 8).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 9).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 1).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 2).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 3).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 4).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 5).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 6).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 7).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 8).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 9).length).toBe(1)
})
