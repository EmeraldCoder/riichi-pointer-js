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
        var result = true;
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (! (tile instanceof NumberedTile && tile.number > 1 && tile.number < 9)) {
                result = false;
            }
        }
        return result;
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
        var result = true;
        var nbHonorTile = 0;
        var suit = null;
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (tile instanceof HonorTile) {
                nbHonorTile++;
            } else {
                if (suit == null) {
                    suit = tile.suit;
                } else {
                    if (suit != tile.suit) {
                        return false;
                    }
                }
            }
        }
        if (nbHonorTile == 0) result = false;
        return result;
    };
}
Honitsu.prototype = new YakuPattern();
Honitsu.prototype.constructor = Honitsu;
