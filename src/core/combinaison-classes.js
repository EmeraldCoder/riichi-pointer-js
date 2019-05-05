import { TileFactory } from './tile-classes'

/**
 * Combinaison factory class
 * Factory design pattern to help create hand combinaison classes
 *
 * ex. : CombinaisonFactory.create('pon', new DotTile(1))
 */
export const CombinaisonFactory = {
  create: function (combinaisonType, firstCombinaisonTile) {
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
        alert('Hand Combinaison Factory Error: "' + combinaisonType + '" is not a supported combinaison type')
    }
  }
}

/**
 * Combinaison base class (pair, pon, kan, chii)
 */
export function Combinaison () {
  this.tiles = [] // property that contain the tiles of the combinaison
}

/**
 * Pair combinaison class
 * two identical tiles (ex. : 3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export function Pair (tile) {
  Combinaison.call(this)

  // constructor
  // fill the base class tiles array
  this.tiles = [TileFactory.create(tile.suit, tile.value), TileFactory.create(tile.suit, tile.value)]
}
Pair.prototype = new Combinaison()
Pair.prototype.constructor = Pair

/**
 * Pon combinaison class
 * three identical tiles (ex. : 3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export function Pon (tile) {
  Combinaison.call(this)

  // constructor
  // fill the base class tiles array
  this.tiles = [
    TileFactory.create(tile.suit, tile.value),
    TileFactory.create(tile.suit, tile.value),
    TileFactory.create(tile.suit, tile.value)
  ]
}
Pon.prototype = new Combinaison()
Pon.prototype.constructor = Pon

/**
 * Kan combinaison class
 * four identical tiles (ex. : 3,3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
export function Kan (tile) {
  Combinaison.call(this)

  // constructor
  // fill the base class tiles array
  this.tiles = [
    TileFactory.create(tile.suit, tile.value),
    TileFactory.create(tile.suit, tile.value),
    TileFactory.create(tile.suit, tile.value),
    TileFactory.create(tile.suit, tile.value)
  ]
}
Kan.prototype = new Combinaison()
Kan.prototype.constructor = Kan

/**
 * Chii combinaison class
 * three following numbered tile of the same suit (ex. : 2,3,4 of bamboo tiles)
 *
 * param Tile tile
 */
export function Chii (tile1, tile2, tile3) {
  Combinaison.call(this)

  // constructor
  // fill the base class tiles array
  this.tiles = [tile1, tile2, tile3]
}
Chii.prototype = new Combinaison()
Chii.prototype.constructor = Chii

export function Orphan (tile) {
  Combinaison.call(this)

  // constructor
  // fill the base class tiles array
  this.tiles = [tile]
}
Orphan.prototype = new Combinaison()
Orphan.prototype.constructor = Orphan
