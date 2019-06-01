import { TileFactory } from './tile-classes'

/**
 * Combinaison factory class
 * Factory design pattern to help create hand combinaison classes
 *
 * ex. : CombinaisonFactory.create('pon', new DotTile(1))
 */
export const CombinaisonFactory = {
  create (combinaisonType, firstCombinaisonTile) {
    switch (combinaisonType) {
      case 'pair':
        return new Pair(firstCombinaisonTile)
      case 'pon':
        return new Pon(firstCombinaisonTile)
      case 'kan':
        return new Kan(firstCombinaisonTile)
      case 'chii':
        var secondCombinaisonTile = TileFactory.create(firstCombinaisonTile.suit, firstCombinaisonTile.value + 1)
        var thirdCombinaisonTile = TileFactory.create(firstCombinaisonTile.suit, firstCombinaisonTile.value + 2)
        return new Chii(firstCombinaisonTile, secondCombinaisonTile, thirdCombinaisonTile)
      case 'orphan':
        return new Orphan(firstCombinaisonTile)
      default:
        throw new Error(`Hand Combinaison Factory Error: "${combinaisonType}" is not a supported combinaison type`)
    }
  }
}

/**
 * Combinaison base class (pair, pon, kan, chii)
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
 * Pon combinaison class
 * three identical tiles (ex. : 3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export class Pon extends Combinaison {
  constructor (tile) {
    super([
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value),
      TileFactory.create(tile.suit, tile.value)
    ])
  }
}

/**
 * Kan combinaison class
 * four identical tiles (ex. : 3,3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export class Kan extends Combinaison {
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
 * Chii combinaison class
 * three following numbered tile of the same suit (ex. : 2,3,4 of bamboo tiles)
 *
 * param Tile tile
 */
export class Chii extends Combinaison {
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
