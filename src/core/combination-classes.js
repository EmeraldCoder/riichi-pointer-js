import { TileFactory } from './tile-classes'

/**
 * Combination factory class
 * Factory design pattern to help create hand combination classes
 *
 * ex. : CombinationFactory.create('triplet', new DotTile(1))
 */
export const CombinationFactory = {
  create (combinationType, firstCombinationTile) {
    switch (combinationType) {
      case 'pair':
        return new Pair(firstCombinationTile)
      case 'triplet':
        return new Triplet(firstCombinationTile)
      case 'quad':
        return new Quad(firstCombinationTile)
      case 'sequence': {
        const secondCombinationTile = TileFactory.create(firstCombinationTile.suit, firstCombinationTile.value + 1)
        const thirdCombinationTile = TileFactory.create(firstCombinationTile.suit, firstCombinationTile.value + 2)
        return new Sequence(firstCombinationTile, secondCombinationTile, thirdCombinationTile)
      }
      case 'orphan':
        return new Orphan(firstCombinationTile)
      default:
        throw new Error(`Hand Combination Factory Error: "${combinationType}" is not a supported combination type`)
    }
  }
}

/**
 * Combination base class (pair, triplet, quad, sequence)
 */
export class Combination {
  constructor (tiles) {
    this.tiles = tiles // property that contain the tiles of the combination
  }
}

/**
 * Pair combination class
 * two identical tiles (ex. : 3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export class Pair extends Combination {
  constructor (tile) {
    super([
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value)
    ])
  }
}

/**
 * Triplet combination class
 * three identical tiles (ex. : 3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export class Triplet extends Combination {
  constructor (tile) {
    super([
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value)
    ])
  }
}

/**
 * Quad combination class
 * four identical tiles (ex. : 3,3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export class Quad extends Combination {
  constructor (tile) {
    super([
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value)
    ])
  }
}

/**
 * Sequence combination class
 * three following numbered tile of the same suit (ex. : 2,3,4 of bamboo tiles)
 *
 * param Tile tile
 */
export class Sequence extends Combination {
  constructor (tile1, tile2, tile3) {
    super([tile1, tile2, tile3])
  }
}

/**
 * Orphan combination class
 * one tile (only used for thirteen orphans yakuman)
 *
 * param Tile tile
 */
export class Orphan extends Combination {
  constructor (tile) {
    super([tile])
  }
}
