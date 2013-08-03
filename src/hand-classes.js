/**
 * Hand class
 *
 * param Array<HandCombinaison> concealedCombinaisons
 * param Array<HandCombinaison> openCombinaisons
 * param String seatWind
 * param String roundWind
 * param Integer winningCombinaisonIndex
 * param Integer winningTileIndex
 * param string winningType 
 * param string winningSecondType
 */
function Hand(concealedCombinaisons, openCombinaisons, seatWind, roundWind, winningCombinaisonIndex, winningTileIndex, winningType, winningSecondType) {
    this.concealedCombinaisons = concealedCombinaisons; // array of HandCombinaison
    this.openCombinaisons = openCombinaisons; // array of HandCombinaison
    this.combinaisons = Array.concat(this.concealedCombinaisons, this.openCombinaisons);
    this.seatWind = seatWind;
    this.roundWind = roundWind;
    this.winningCombinaisonIndex = winningCombinaisonIndex;
    this.winningTileIndex = winningTileIndex;
    this.winningType = winningType;
    this.winningSecondType = winningSecondType;
    this.isRiichi = false;
    this.isDoubleRiichi = false;
    this.isIppatsu = false;
    
    this.isFinish = function(){
        var nbPair = 0,
            nbCombinaison = 0;
            
        for (var i = 0; i < this.combinaisons.length; i++) {
            var combinaison = this.combinaisons[i];
            if (combinaison instanceof Pair) {
                nbPair++;
            } else {
                nbCombinaison++;
            }
        }
    
        if (nbPair === 1 && nbCombinaison === 4) {
            return true;
        }
        if (nbPair === 7 && nbCombinaison === 0) {
            return true;
        }
    
        return false;
    };
    
    this.isTwoSidedWait = function(){
        if (this.winningCombinaisonIndex !== undefined && this.winningTileIndex !== undefined) {
            var combinaison = this.combinaisons[this.winningCombinaisonIndex];
            var tile = combinaison.tiles[this.winningTileIndex];
            if (combinaison instanceof Chii) {
                if (this.winningTileIndex !== 1 && !this.isEdgeWait()) {
                    return true;
                }
            }
        }
        return false;
    };
    
    this.isEdgeWait = function(){
        if (this.winningCombinaisonIndex !== undefined && this.winningTileIndex !== undefined) {
            var combinaison = this.combinaisons[this.winningCombinaisonIndex];
            var tile = combinaison.tiles[this.winningTileIndex];
            if (combinaison instanceof Chii) {
                if (this.winningTileIndex === 0 && tile.number === 7) return true;
                if (this.winningTileIndex === 2 && tile.number === 3) return true;
            }
        }
        return false;
    };
    
    this.isClosedWait = function(){
        if (this.winningCombinaisonIndex !== undefined && this.winningTileIndex !== undefined) {
            var combinaison = this.combinaisons[this.winningCombinaisonIndex];
            if (combinaison instanceof Chii) {
                if (this.winningTileIndex === 1) return true;
            }
        }
        return false;
    };
    
    this.isSingleWait = function(){
        if (this.winningCombinaisonIndex !== undefined && this.winningTileIndex !== undefined) {
            var combinaison = this.combinaisons[this.winningCombinaisonIndex];
            if (!(combinaison instanceof Chii)) return true;
        }
        return false;
    };
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
