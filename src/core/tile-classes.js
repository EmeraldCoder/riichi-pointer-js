/**
 * Tile factory class
 * Factory design pattern to help create tile classes
 *
 * ex. : TileFactory.create('dragon', 'red')
 */
export const TileFactory = {
  create (suit, value) {
    switch (suit) {
      case 'dragon':
        return new DragonTile(value)
      case 'wind':
        return new WindTile(value)
      case 'bamboo':
        return new BambooTile(value)
      case 'dot':
        return new DotTile(value)
      case 'character':
        return new CharacterTile(value)
      default:
        throw new Error(`Tile Factory Error : "${suit}" is not a supported suit`)
    }
  }
}

/**
 * Tile base class
 * All tile inherit from this class
 */
export class Tile {
  constructor (suit, value) {
    this.suit = suit
    this.value = value
  }
}

/**
 * Honor tile base class
 * Wind and Dragon tile inherit from this class
 */
export class HonorTile extends Tile {}

/**
 * Numbered tile base class
 * Dot, Character and Bamboo tile inherit from this class
 */
export class NumberedTile extends Tile {
  constructor (suit, value) {
    super(suit, value)
    this.number = value
  }

  isTerminal () {
    return this.number === 1 || this.number === 9
  }
}

/**
 * Wind tile class
 * East, South, West and North tile
 */
export class WindTile extends HonorTile {
  constructor (direction) {
    super('wind', direction) // east, south, west, north
    this.direction = direction
  }
}

/**
 * Dragon tile class
 * Red, Green and White dragon tile
 */
export class DragonTile extends HonorTile {
  constructor (color) {
    super('dragon', color) // red, green, white
    this.color = color
  }
}

/**
 * Dot tile class
 */
export class DotTile extends NumberedTile {
  constructor (number) {
    super('dot', number)
  }
}

/**
 * Character tile class
 */
export class CharacterTile extends NumberedTile {
  constructor (number) {
    super('character', number)
  }
}

/**
 * Bamboo tile class
 */
export class BambooTile extends NumberedTile {
  constructor (number) {
    super('bamboo', number)
  }
}
