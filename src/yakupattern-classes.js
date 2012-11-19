/**
 * Baseclass for the yaku pattern classes
 */
function YakuPattern() {}

/**
 * Tanyaou Chuu (all simples) yaku pattern
 * A concealed hand consisting only of suit tiles 2-8
 */
function TanyaouChuu() {
    YakuPattern.call(this);
    
    this.check = function(tiles) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (! (tile instanceof NumberedTile && tile.number > 1 && tile.number < 9)) {
                return false;
            }
        }
        return true;
    };
}
TanyaouChuu.prototype = new YakuPattern();
TanyaouChuu.prototype.constructor = TanyaouChuu;

/**
 * Honitsu (half flush) yaku pattern
 * A hand with tiles from only one suit plus honor tiles
 */
function Honitsu() {
    YakuPattern.call(this);
    
    this.check = function(tiles) {
        var nbHonorTile = 0;
        var suit = null;
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (tile instanceof HonorTile) {
                nbHonorTile++;
            } else {
                if (suit == null) {
                    suit = tile.suit;
                } else if (suit != tile.suit) {
                    return false;
                }
            }
        }
        return nbHonorTile > 0;
    };
}
Honitsu.prototype = new YakuPattern();
Honitsu.prototype.constructor = Honitsu;

/**
 * Chinitsu (full flush) yaku pattern
 * A hand with tile from only one suit and no honor tiles
 */
function Chinitsu() {
    YakuPattern.call(this);
    
    this.check = function(tiles) {
        var suit = null;
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (tile instanceof HonorTile) return false;
            if (suit == null) {
                suit = tile.suit;
            } else if (suit != tile.suit) {
                return false;
            }
        }
        return true;
    };
}
Chinitsu.prototype = new YakuPattern();
Chinitsu.prototype.constructor = Chinitsu;

/**
 * Honroutou (all terminals & honors) yaku pattern
 * A hand consisting of only terminals and honors
 */
function Honroutou() {
    YakuPattern.call(this);
    
    this.check = function(tiles) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (! (tile instanceof HonorTile || tile.isTerminal())) return false; 
        }
        return true;
    };
}
Honroutou.prototype = new YakuPattern();
Honroutou.prototype.constructor = Honroutou;

