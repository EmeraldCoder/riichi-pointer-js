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

/**
 * Chii Toitsu (seven pairs) yaku pattern
 * A hand consisting of seven pairs
 */
function ChiiToitsu() {
    YakuPattern.call(this);

    this.check = function(hand) {
        var nbPair = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pair) nbPair++;
        }
        return nbPair == 7;
    }
}
ChiiToitsu.prototype = new YakuPattern();
ChiiToitsu.prototype.constructor = ChiiToitsu;

/**
 * San Shoku Dokou (triple pon) yaku pattern
 * One pon or kan in each of the three suits, all having the same number.
 */
function SanShokuDokou() {
    YakuPattern.call(this);

    this.check = function(hand) {
        var storedPons = {};
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pon || combinaison instanceof Kan) {
                var tile = combinaison.tiles[0];
                if (tile instanceof NumberedTile) {
                    if (storedPons[tile.number] == undefined) storedPons[tile.number] = 0;
                    storedPons[tile.number]++;
                    if (storedPons[tile.number] == 3) return true;
                }
            }
        }
        return false;
    }
}
SanShokuDokou.prototype = new YakuPattern();
SanShokuDokou.prototype.constructor = SanShokuDokou;

/*
 * Toi-Toi Hou (all pons) yaku pattern
 * A hand with four pons/kans and one pair.
 */
function ToiToiHou() {
    YakuPattern.call(this);

    this.check = function(hand) {
        var nbPon = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pon || combinaison instanceof Kan) nbPon++;
        }
        return nbPon >= 4;
    };
}
ToiToiHou.prototype = new YakuPattern();
ToiToiHou.prototype.constructor = ToiToiHou;

/**
 * Shou Sangen (three little dragons) yaku pattern
 * Two pons/kans of dragons plus one pair of dragons.
 */
function ShouSangen() {
    YakuPattern.call(this);

    this.check = function(hand) {
        var nbDragonPair = 0;
        var nbDragonPon = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pair) {
                if (combinaison.tiles[0] instanceof DragonTile) nbDragonPair++;
            } else if (combinaison instanceof Pon || combinaison instanceof Kan) {
                if (combinaison.tiles[0] instanceof DragonTile) nbDragonPon++;
            }
        }
        return nbDragonPair >= 1 && nbDragonPon >=2;
    };
}
ShouSangen.prototype = new YakuPattern();
ShouSangen.prototype.constructor = ShouSangen;

/**
 * Ryan Peikou (twice pure double chiis) yaku pattern
 * Two pair of chiis, where each pair consists of two identical chiis.
 */
function RyanPeikou() {
    YakuPattern.call(this);
    
    this.check = function(hand) {
        var chiis = {};
        var nbPairOfChii = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Chii) {
                var chiiKey = combinaison.tiles[0].suit + combinaison.tiles[0].number;
                if (chiis[chiiKey] == undefined) chiis[chiiKey] = 0; else nbPairOfChii++;
            }
        }        
        return nbPairOfChii == 2;
    };
}
RyanPeikou.prototype = new YakuPattern();
RyanPeikou.prototype.constructor = RyanPeikou;

/**
 * Junchan Taiyai (terminals in all sets) yaku pattern
 * A hand with at least one chii and where all sets and the pair contains terminals
 */
function JunchanTaiyai() {
    YakuPattern.call(this);
    
    this.check = function(hand) {
        var nbChii = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Chii) nbChii++;
            var nbTerminal = 0;
            for (var j = 0; j < combinaison.tiles.length; j++) {
                var tile = combinaison.tiles[j];
                if (tile instanceof NumberedTile && tile.isTerminal()) nbTerminal++;
            }
            if (nbTerminal == 0) return false;
        }
        return nbChii > 0;
    };
}
JunchanTaiyai.prototype = new YakuPattern();
JunchanTaiyai.prototype.constructor = JunchanTaiyai;

/**
 * Fanpai/Yakuhai (Seat Wind)
 * A pon or kan in the players wind.
 */
function FanpaiSeatWind() {
    YakuPattern.call(this);
    
    this.check = function(hand) {
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pon || combinaison instanceof Kan) {
                var tile = combinaison.tiles[0];
                if (tile instanceof WindTile && tile.direction == hand.seatWind) return true;
            }
        }
        return false;
    };
}
FanpaiSeatWind.prototype = new YakuPattern();
FanpaiSeatWind.prototype.constructor = FanpaiSeatWind;
