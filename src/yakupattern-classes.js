/**
 * Baseclass for the yaku pattern classes
 */
function YakuPattern() {}

/**
 * Tanyaou Chuu (all simples) yaku pattern
 * A hand consisting only of suit tiles 2-8 (without terminal or honor tiles)
 * 
 * Must be concealed : no (some rules say yes)
 * Han : 1
 */
function TanyaouChuu() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Tanyaou Chuu';
    this.englishName = 'All Simples';
    
    this.check = function(hand) {
        for (var i = 0; i < hand.combinaisons.length; i++) {
            for (var j = 0; j < hand.combinaisons[i].tiles.length; j++) {
                var tile = hand.combinaisons[i].tiles[j];
                if (tile instanceof HonorTile || tile.isTerminal()) return 0;
            }
        }
        return 1;
    };
}
TanyaouChuu.prototype = new YakuPattern();
TanyaouChuu.prototype.constructor = TanyaouChuu;

/**
 * Honitsu (half flush) yaku pattern
 * A hand with tiles from only one suit plus honor tiles
 *
 * Must be concealed: no
 * Han: 3 (concealed) / 2 (open)
 */
function Honitsu() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Honitsu';
    this.englishName = 'Half Flush';
    
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
                        return 0;
                    }
                }
            }
        }
        if (nbHonorTile > 0) {
            if (hand.openCombinaisons.length > 0) {
                return 2;
            } else {
                return 3;
            }
        } else {
            return 0;
        }
    };
}
Honitsu.prototype = new YakuPattern();
Honitsu.prototype.constructor = Honitsu;

/**
 * Chinitsu (full flush) yaku pattern
 * A hand with tiles from only one suit
 *
 * Must be concealed: no
 * Han: 6 (concealed) / 5 (open)
 */
function Chinitsu() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Chinitsu';
    this.englishName = 'Full Flush';
    
    this.check = function(hand) {
        var suit = null;
        for (var i = 0; i < hand.combinaisons.length; i ++) {
            for (var j = 0; j < hand.combinaisons[i].tiles.length; j++) {
                var tile = hand.combinaisons[i].tiles[j];
                if (tile instanceof HonorTile) return 0;
                if (suit == null) {
                    suit = tile.suit;
                } else if (suit != tile.suit) {
                    return 0;
                }
            }
        }
        if (hand.openCombinaisons.length > 0) {
            return 5;
        } else {
            return 6;
        }
    };
}
Chinitsu.prototype = new YakuPattern();
Chinitsu.prototype.constructor = Chinitsu;

/**
 * Honroutou (all terminals & honors) yaku pattern
 * A hand consisting of only terminals and honors
 *
 * Must be concealed: no
 * Han: 2
 */
function Honroutou() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Honroutou';
    this.englishName = 'All terminals & honors';
    
    this.check = function(hand) {
        for (var i = 0; i < hand.combinaisons.length; i ++) {
            for (var j = 0; j < hand.combinaisons[i].tiles.length; j++) {
                var tile = hand.combinaisons[i].tiles[j];
                if (! (tile instanceof HonorTile || tile.isTerminal())) return 0; 
            }
        }
        return 2;
    };
}
Honroutou.prototype = new YakuPattern();
Honroutou.prototype.constructor = Honroutou;

/**
 * Iipeikou (pure double chii) yaku pattern
 * Two chiis of the same value and suit
 *
 * Must be concealed: yes
 * Han: 1
 */
function Iipeikou() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Iipeikou';
    this.englishName = 'Pure Double Chii';
    
    this.check = function(hand) {
        if (hand.openCombinaisons.length > 0) return 0;
        
        var storedChiis = [];
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Chii) {
                for (var j = 0; j < storedChiis.length; j++) {
                    if (storedChiis[j].tiles[0].suit == combinaison.tiles[0].suit &&
                        storedChiis[j].tiles[0].number == combinaison.tiles[0].number) {
                            return 1;
                    }
                }
                storedChiis.push(combinaison);
            }
        }
        return 0;
    };
}
Iipeikou.prototype = new YakuPattern();
Iipeikou.prototype.constructor = Iipeikou;

/**
 * San Shoku Doujun (mixed triple chii) yaku pattern
 * Three chiis of the same value, with one in each suit
 *
 * Must be concealed: no
 * Han: 2 (concealed) / 1 (open)
 */
function SanShokuDoujun() {
    YakuPattern.call(this);
    
    this.japaneseName = 'San Shoku Doujun';
    this.englishName = 'Mixed Triple Chii';
    
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
                
                if (chii.dot && chii.bamboo && chii.character) {
                    if (hand.openCombinaisons.length > 0) {
                        return 1;
                    } else {
                        return 2;
                    }
                }
            }
        }
        return 0;
    };
}
SanShokuDoujun.prototype = new YakuPattern();
SanShokuDoujun.prototype.construction = SanShokuDoujun;

/**
 * Itsu or Ikkitsuukan (pure straight) yaku pattern
 * Three consecutive chiis (1-9) in the same suit
 *
 * Must be concealed: no
 * Han: 2 (concealed) / 1 (open)
 */
function Itsu() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Itsu'; // can be call Ikkitsuukan
    this.englishName = 'Pure Straight';
    
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
                
                if (chii[1] && chii[4] && chii[7]) {
                    if (hand.openCombinaisons.length > 0) {
                        return 1;
                    } else {
                        return 2;
                    }
                }
            }
        }
        return 0;
    };
}
Itsu.prototype = new YakuPattern();
Itsu.prototype.constructor = Itsu;

/**
 * Chanta (outside hand) yaku pattern
 * A hand where all sets contain a terminal or honor tile, and at least one of the sets is a chii.
 * 
 * Must be concealed: no
 * Han: 2 (concealed) / 1 (open)
 */
function Chanta() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Chanta';
    this.englishName = 'Outside Hand';

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
            if (nbTerminalOrHonor == 0) return 0;
        }
        if (nbChii > 0) {
            if (hand.openCombinaisons.length > 0) {
                return 1;
            } else {
                return 2;
            }
        } else {
            return 0;
        }
    }
}
Chanta.prototype = new YakuPattern();
Chanta.prototype.constructor = Chanta;

/**
 * Chii Toitsu (seven pairs) yaku pattern
 * A hand consisting of seven pairs
 *
 * Must be concealed: yes
 * Han: 2
 */
function ChiiToitsu() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Chii Toitsu';
    this.englishName = 'Seven Pairs';

    this.check = function(hand) {
        var nbPair = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pair) nbPair++;
        }
        if (nbPair === 7) {
            return 2;
        } else {
            return 0;
        }
    }
}
ChiiToitsu.prototype = new YakuPattern();
ChiiToitsu.prototype.constructor = ChiiToitsu;

/**
 * San Shoku Dokou (triple pon) yaku pattern
 * One pon or kan in each of the three suits, all having the same number.
 *
 * Must be concealed: no
 * Han: 2
 */
function SanShokuDokou() {
    YakuPattern.call(this);
    
    this.japaneseName = 'San Shoku Dokou';
    this.englishName = 'Triple Pon';

    this.check = function(hand) {
        var storedPons = {};
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pon || combinaison instanceof Kan) {
                var tile = combinaison.tiles[0];
                if (tile instanceof NumberedTile) {
                    if (storedPons[tile.number] == undefined) storedPons[tile.number] = 0;
                    storedPons[tile.number]++;
                    if (storedPons[tile.number] == 3) return 2;
                }
            }
        }
        return 0;
    }
}
SanShokuDokou.prototype = new YakuPattern();
SanShokuDokou.prototype.constructor = SanShokuDokou;

/*
 * Toi-Toi Hou (all pons) yaku pattern
 * A hand with four pons/kans and one pair.
 * 
 * Must be concealed: no
 * Han: 2
 */
function ToiToiHou() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Toi-Toi Hou';
    this.englishName = 'All Pon';

    this.check = function(hand) {
        var nbPon = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pon || combinaison instanceof Kan) nbPon++;
        }
        if (nbPon >= 4) {
            return 2;
        } else {
            return 0;
        }
    };
}
ToiToiHou.prototype = new YakuPattern();
ToiToiHou.prototype.constructor = ToiToiHou;

/**
 * Shou Sangen (little three dragons) yaku pattern
 * Two pons/kans of dragons plus one pair of dragons.
 *
 * Must be concealed: no
 * Han: 2
 */
function ShouSangen() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Shou Sangen';
    this.englishName = 'Little Three Dragons';

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
        if (nbDragonPair >= 1 && nbDragonPon >=2) {
            return 2;
        } else {
            return 0;
        }
    };
}
ShouSangen.prototype = new YakuPattern();
ShouSangen.prototype.constructor = ShouSangen;

/**
 * Ryan Peikou (twice pure double chiis) yaku pattern
 * Two pair of chiis, where each pair consists of two identical chiis.
 *
 * Must be concealed: yes
 * Han: 3
 *
 */
function RyanPeikou() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Ryan Peikou';
    this.englishName = 'Twice Pure Double Chii';
    
    this.check = function(hand) {
        if (hand.openCombinaisons.length > 0) return 0;
    
        var chiis = {};
        var nbPairOfChii = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Chii) {
                var chiiKey = combinaison.tiles[0].suit + combinaison.tiles[0].number;
                if (chiis[chiiKey] == undefined) chiis[chiiKey] = 0; else nbPairOfChii++;
            }
        }        
        if (nbPairOfChii == 2) {
            return 3;
        } else {
            return 0;
        }
    };
}
RyanPeikou.prototype = new YakuPattern();
RyanPeikou.prototype.constructor = RyanPeikou;

/**
 * Junchan Taiyai or Junchan Tayao or Junchan (terminals in all sets) yaku pattern
 * A hand with at least one chii and where all sets and the pair contains terminals
 * 
 * Must be concealed: no
 * Han: 3 (concealed) / 2 (open)
 */
function JunchanTaiyai() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Junchan Taiyai'; // can also be call Junchan Tayao or Junchan
    this.englishName = 'Terminals in all sets';
    
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
            if (nbTerminal == 0) return 0;
        }
        if (nbChii > 0) {
            return 3;
        } else {
            return 0;
        }
    };
}
JunchanTaiyai.prototype = new YakuPattern();
JunchanTaiyai.prototype.constructor = JunchanTaiyai;

/**
 * Fanpai/Yakuhai (Seat Wind) yaku pattern
 * A pon or kan in the players wind.
 *
 * Must be concealed: no
 * Han: 1
 */
function FanpaiSeatWind() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Fanpai';
    this.englishName = 'Seat Wind';
    
    this.check = function(hand) {
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pon || combinaison instanceof Kan) {
                var tile = combinaison.tiles[0];
                if (tile instanceof WindTile && tile.direction == hand.seatWind) return 1;
            }
        }
        return 0;
    };
}
FanpaiSeatWind.prototype = new YakuPattern();
FanpaiSeatWind.prototype.constructor = FanpaiSeatWind;

/**
 * Fanpai/Yakuhai (Round Wind) yaku pattern
 * A pon or kan in the prevalent wind.
 *
 * Must be concealed: no
 * Han: 1
 */
function FanpaiRoundWind() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Fanpai';
    this.englishName = 'Round Wind';
    
    this.check = function(hand) {
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pon || combinaison instanceof Kan) {
                var tile = combinaison.tiles[0];
                if (tile instanceof WindTile && tile.direction == hand.roundWind) return 1;
            }
        }
        return 0;
    };
}
FanpaiRoundWind.prototype = new YakuPattern();
FanpaiRoundWind.prototype.constructor = FanpaiRoundWind;

/**
 * Fanpai/Yakuhai (Dragon Pon) yaku pattern
 * A pon or kan in the prevalent wind.
 *
 * Must be concealed: no
 * Han: 1
 */
function FanpaiDragonPon() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Fanpai';
    this.englishName = 'Dragon Pon';
    
    this.check = function(hand) {
        var nbDragonPon = 0;
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            if (combinaison instanceof Pon || combinaison instanceof Kan) {
                if (combinaison.tiles[0] instanceof DragonTile) nbDragonPon++;
            }
        }
        return nbDragonPon;
    };
}
FanpaiDragonPon.prototype = new YakuPattern();
FanpaiDragonPon.prototype.constructor = FanpaiDragonPon;

/**
 * Pinfu (All chii / No points) yaku pattern
 * A hand with no fu except the one for winning
 * Just chii, no pair point (dragon or seat/prevalent wind) and a two-sided wait (only wait that give no fu)
 *
 * Must be concealed: yes
 * Han: 1
 */
function Pinfu() {
    YakuPattern.call(this);
    
    this.japaneseName = 'Pinfu';
    this.englishName = 'All Chii / No points';
    
    this.check = function(hand) {
        if (hand.openCombinaisons.length > 0) return 0;
        if (hand.isEdgeWait()) return 0;
        if (hand.isClosedWait()) return 0;
        if (hand.isSingleWait()) return 0;
        
        for (var i = 0; i < hand.combinaisons.length; i++) {
            var combinaison = hand.combinaisons[i];
            
            if (combinaison instanceof Pair) {
                if (combinaison.tiles[0] instanceof DragonTile) return 0;
                if (combinaison.tiles[0] instanceof WindTile) {
                    if (combinaison.tiles[0].direction === hand.seatWind) return 0;
                    if (combinaison.tiles[0].direction === hand.roundWind) return 0;
                }
            }
            
            if (combinaison instanceof Pon || combinaison instanceof Kan) return 0;
        }
        
        return 1;
    };
}
Pinfu.prototype = new YakuPattern();
Pinfu.prototype.constructor = Pinfu;
