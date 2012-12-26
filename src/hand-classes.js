/**
 * Hand class
 *
 * param Array<HandCombinaison> combinaisons
 * param String seatWind
 * param String roundWind
 */
function Hand(combinaisons, seatWind, roundWind) {
    this.combinaisons = combinaisons; // array of HandCombinaison
    this.seatWind = seatWind;
    this.roundWind = roundWind;
}

/**
 * Hand combinaison base class (pair, pon, kan, chii)
 */
function HandCombinaison() {
    this.tiles = []; // property that contain the tiles of the combinaison
}

/**
 * Pair combinaison class
 * two identical tiles (ex. : 3,3 of bamboo tiles)
 *
 * param Tile tile
 */
function Pair(tile) {
    HandCombinaison.call(this);
    
    // constructor
    // fill the base class tiles array
    this.tiles = [tile, tile];
}
Pair.prototype = new HandCombinaison();
Pair.prototype.constructor = Pair;

/**
 * Pon combinaison class
 * three identical tiles (ex. : 3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
function Pon(tile) {
    HandCombinaison.call(this);
    
    // constructor
    // fill the base class tiles array
    this.tiles = [tile, tile, tile];
}
Pon.prototype = new HandCombinaison();
Pon.prototype.constructor = Pon;

/**
 * Kan combinaison class
 * four identical tiles (ex. : 3,3,3,3 of bamboo tiles)
 *
 * param Tile tile
 */
function Kan(tile) {
    HandCombinaison.call(this);
    
    // constructor
    // fill the base class tiles array
    this.tiles = [tile, tile, tile, tile];
}
Kan.prototype = new HandCombinaison();
Kan.prototype.constructor = Kan;

/**
 * Chii combinaison class
 * three following numbered tile of the same suit (ex. : 2,3,4 of bamboo tiles)
 *
 * param Tile tile
 */
function Chii(tile1, tile2, tile3) {
    HandCombinaison.call(this);
    
    // constructor
    // fill the base class tiles array
    this.tiles = [tile1, tile2, tile3];
}
Chii.prototype = new HandCombinaison();
Chii.prototype.constructor = Chii;
