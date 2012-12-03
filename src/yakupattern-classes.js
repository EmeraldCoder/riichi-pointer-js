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
    
    this.check = function(hand) {
        for (var i = 0; i < hand.combinaisons.length; i++) {
            for (var j = 0; j < hand.combinaisons[i].tiles.length; j++) {
                var tile = hand.combinaisons[i].tiles[j];
                if (tile instanceof HonorTile || tile.isTerminal()) return false;
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
    
    this.check = function(hand) {
        var nbHonorTile = 0;
        var suit = null;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            for (var j = 0; j < hand.combinaisons[i].tiles.length; j++) {
                var tile = hand.combinaisons[i].tiles[j];
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
    
    this.check = function(hand) {
        var suit = null;
        for (var i = 0; i < hand.combinaisons.length; i ++) {
            for (var j = 0; j < hand.combinaisons[i].tiles.length; j++) {
                var tile = hand.combinaisons[i].tiles[j];
                if (tile instanceof HonorTile) return false;
                if (suit == null) {
                    suit = tile.suit;
                } else if (suit != tile.suit) {
                    return false;
                }
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
    
    this.check = function(hand) {
        for (var i = 0; i < hand.combinaisons.length; i ++) {
            for (var j = 0; j < hand.combinaisons[i].tiles.length; j++) {
                var tile = hand.combinaisons[i].tiles[j];
                if (! (tile instanceof HonorTile || tile.isTerminal())) return false; 
            }
        }
        return true;
    };
}
Honroutou.prototype = new YakuPattern();
Honroutou.prototype.constructor = Honroutou;

/**
 * Iipeikou (pure double chii) yaku pattern
 * Two chiis of the same value and suit
 */
function Iipeikou() {
    YakuPattern.call(this);
    
    this.check = function(hand) {
        var storedChiis = [];
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Chii) {
                for (var j = 0; j < storedChiis.length; j++) {
                    if (storedChiis[j].tiles[0].suit == combinaison.tiles[0].suit &&
                        storedChiis[j].tiles[0].number == combinaison.tiles[0].number) {
                            return true;
                    }
                }
                storedChiis.push(combinaison);
            }
        }
        return false;
    };
}
Iipeikou.prototype = new YakuPattern();
Iipeikou.prototype.constructor = Iipeikou;

/**
 * San Shoku Doujun (mixed triple chii) yaku pattern
 * Three chiis of the same value, with one in each suit
 */
function SanShokuDoujun() {
    YakuPattern.call(this);
    
    this.check = function(hand) {
        var storedChiis = {};
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Chii) {
                var tile = combinaison.tiles[0];
                
                if (storedChiis[tile.number] == undefined) {
                    storedChiis[tile.number] = { dot: 0, bamboo: 0, character: 0 };
                }
                
                var chii = storedChiis[tile.number];
                
                chii[tile.suit]++;
                
                if (chii.dot && chii.bamboo && chii.character) return true;
            }
        }
        return false;
    };
}
SanShokuDoujun.prototype = new YakuPattern();
SanShokuDoujun.prototype.construction = SanShokuDoujun;

/**
 * Itsu (pure straight) yaku pattern
 * Three consecutive chiis (1-9) in the same suit
 */
function Itsu() {
    YakuPattern.call(this);
    
    this.check = function(hand) {
        var storedChiis = {};
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Chii) {
                var tile = combinaison.tiles[0];
                
                if (storedChiis[tile.suit] == undefined) {
                    storedChiis[tile.suit] = {1: 0, 4: 0, 7: 0};
                }
                
                var chii = storedChiis[tile.suit];
                
                chii[tile.number]++;
                
                if (chii[1] && chii[4] && chii[7]) return true;
            }
        }
        return false;
    };
}
Itsu.prototype = new YakuPattern();
Itsu.prototype.constructor = Itsu;

/**
 * Chanta (outside hand) yaku pattern
 * A hand where all sets contain a terminal or honor tile, and at least one of the sets is a chii.
 */
function Chanta() {
    YakuPattern.call(this);

    this.check = function(hand) {
        var nbChii = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Chii) nbChii++;

            var nbTerminalOrHonor = 0;
            for (var j = 0; j < combinaison.tiles.length; j++) {
                var tile = combinaison.tiles[j];
                if (tile instanceof HonorTile || tile.isTerminal()) nbTerminalOrHonor++;
            }
            if (nbTerminalOrHonor == 0) return false;
        }
        return nbChii > 0;
    }
}
Chanta.prototype = new YakuPattern();
Chanta.prototype.constructor = Chanta;
