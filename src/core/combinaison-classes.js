import { TileFactory } from './tile-classes'

/**
 * Combinaison factory class
 * Factory design pattern to help create hand combinaison classes
 *
 * ex. : CombinaisonFactory.create('triplet', new DotTile(1))
 */
export const CombinaisonFactory = {
  create (combinaisonType, firstCombinaisonTile) {
    switch (combinaisonType) {
      case 'pair':
        return new Pair(firstCombinaisonTile)
      case 'triplet':
        return new Triplet(firstCombinaisonTile)
      case 'quad':
        return new Quad(firstCombinaisonTile)
      case 'sequence':
        var secondCombinaisonTile = TileFactory.create(firstCombinaisonTile.suit, firstCombinaisonTile.value + 1)
        var thirdCombinaisonTile = TileFactory.create(firstCombinaisonTile.suit, firstCombinaisonTile.value + 2)
        return new Sequence(firstCombinaisonTile, secondCombinaisonTile, thirdCombinaisonTile)
      case 'orphan':
        return new Orphan(firstCombinaisonTile)
      default:
        throw new Error(`Hand Combinaison Factory Error: "${combinaisonType}" is not a supported combinaison type`)
    }
  }
}

/**
 * Combinaison base class (pair, triplet, quad, sequence)
 */
export class Combinaison {
  constructor (tiles) {
    this.tiles = tiles // property that contain the tiles of the combinaison
  }
}

/**
 * Pair combinaison class
 * two identical tiles (ex. : 3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export class Pair extends Combinaison {
  constructor (tile) {
    super([
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value)
    ])
  }
}

/**
 * Triplet combinaison class
 * three identical tiles (ex. : 3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export class Triplet extends Combinaison {
  constructor (tile) {
    super([
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value)
    ])
  }
}

/**
 * Quad combinaison class
 * four identical tiles (ex. : 3,3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export class Quad extends Combinaison {
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
 * Sequence combinaison class
 * three following numbered tile of the same suit (ex. : 2,3,4 of bamboo tiles)
 *
 * param Tile tile
 */
export class Sequence extends Combinaison {
  constructor (tile1, tile2, tile3) {
    super([tile1, tile2, tile3])
  }
}

/**
 * Orphan combinaison class
 * one tile (only used for thirteen orphans yakuman)
 *
 * param Tile tile
 */
export class Orphan extends Combinaison {
  constructor (tile) {
    super([tile])
  }
}
