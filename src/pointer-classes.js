function FuCalculator() {};

FuCalculator.prototype.calculate = function(hand, winningType) {
    var total = 0;

    var chiiToitsu = new ChiiToitsu();
    if (chiiToitsu.check(hand)) {
        // seven pairs always award 25 fu
        total += 25;
    } else if (winningType === 'ron' && hand.openCombinaisons.length === 0) {
        // concealed ron always award 30 fu
        total += 30;
    } else {
        // everything else award 20 fu
        total += 20;
    }   
    
    for (var i = 0; i < hand.openCombinaisons.length; i++) {
        if (hand.openCombinaisons[i] instanceof Pon) {
            var firstTile = hand.openCombinaisons[i].tiles[0];
            if (firstTile instanceof HonorTile || firstTile.isTerminal()) {
                total += 4;
            } else {
                total += 2;
            }
        } else if (hand.openCombinaisons[i] instanceof Kan) {
            var firstTile = hand.openCombinaisons[i].tiles[0];
            if (firstTile instanceof HonorTile || firstTile.isTerminal()) {
                total += 16;
            } else {
                total += 8;
            }
        }
    }
    
    for (var i = 0; i < hand.concealedCombinaisons.length; i++) {
        if (hand.concealedCombinaisons[i] instanceof Pon) {
            var firstTile = hand.concealedCombinaisons[i].tiles[0];
            if (firstTile instanceof HonorTile || firstTile.isTerminal()) {
                total += 8;
            } else {
                total += 4;
            }
        } else if (hand.concealedCombinaisons[i] instanceof Kan) {
            var firstTile = hand.concealedCombinaisons[i].tiles[0];
            if (firstTile instanceof HonorTile || firstTile.isTerminal()) {
                total += 32;
            } else {
                total += 16;
            }
        }
    }
    
    for (var i = 0; i < hand.combinaisons.length; i++) {
        if (hand.combinaisons[i] instanceof Pair) {
            var firstTile = hand.combinaisons[i].tiles[0];
            if (firstTile instanceof DragonTile) {
                total += 2;
            } else if (firstTile instanceof WindTile) {
                if (firstTile.direction === hand.seatWind || firstTile.direction === hand.roundWind) {
                    total += 2;
                }
            }
        }
    }
    
    return total;
};
