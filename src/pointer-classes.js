function FuCalculator() {};
function PointCalculator() {};

FuCalculator.prototype.calculate = function(hand) {
    var result = {
        total: 0,
        details: []
    };

    var chiiToitsu = new ChiiToitsu(),
        pinfu = new Pinfu(),
        isChiiToitsu = chiiToitsu.check(hand),
        isPinfu = pinfu.check(hand);
    
    if (isChiiToitsu) {
        // seven pairs always award 25 fu
        result.details.push({ name: 'Win with a chiitoitsu', value: 25 });
        result.total += 25;
        return result;
    } else if (hand.winningType === 'ron' && hand.openCombinaisons.length === 0) {
        // concealed ron always award 30 fu
        result.details.push({ name: 'Win by ron with a concealed hand', value: 30 });
        result.total += 30;
    } else {
        // everything else award 20 fu
        result.details.push({ name: 'Win', value: 20 });
        result.total += 20;
    }   
    
    for (var i = 0; i < hand.openCombinaisons.length; i++) {
        if (hand.openCombinaisons[i] instanceof Pon) {
            var firstTile = hand.openCombinaisons[i].tiles[0];
            if (firstTile instanceof HonorTile || firstTile.isTerminal()) {
                result.details.push({ name: 'Open honor/terminal pon', value: 4 });
                result.total += 4;
            } else {
                result.details.push({ name: 'Open simple pon', value: 2 });
                result.total += 2;
            }
        } else if (hand.openCombinaisons[i] instanceof Kan) {
            var firstTile = hand.openCombinaisons[i].tiles[0];
            if (firstTile instanceof HonorTile || firstTile.isTerminal()) {
                result.details.push({ name: 'Open honor/terminal kan', value: 16 });
                result.total += 16;
            } else {
                result.details.push({ name: 'Open simple kan', value: 8 });
                result.total += 8;
            }
        }
    }
    
    for (var i = 0; i < hand.concealedCombinaisons.length; i++) {
        if (hand.concealedCombinaisons[i] instanceof Pon) {
            var firstTile = hand.concealedCombinaisons[i].tiles[0];
            if (firstTile instanceof HonorTile || firstTile.isTerminal()) {
                result.details.push({ name: 'Concealed honor/terminal pon', value: 8 });
                result.total += 8;
            } else {
                result.details.push({ name: 'Concealed simple pon', value: 4 });
                result.total += 4;
            }
        } else if (hand.concealedCombinaisons[i] instanceof Kan) {
            var firstTile = hand.concealedCombinaisons[i].tiles[0];
            if (firstTile instanceof HonorTile || firstTile.isTerminal()) {
                result.details.push({ name: 'Concealed honor/terminal kan', value: 32 });
                result.total += 32;
            } else {
                result.details.push({ name: 'Concealed simple kan', value: 16 });
                result.total += 16;
            }
        }
    }
    
    for (var i = 0; i < hand.combinaisons.length; i++) {
        if (hand.combinaisons[i] instanceof Pair) {
            var firstTile = hand.combinaisons[i].tiles[0];
            if (firstTile instanceof DragonTile) {
                result.details.push({ name: 'Dragon pair', value: 2 });
                result.total += 2;
            } else if (firstTile instanceof WindTile) {
                if (firstTile.direction === hand.seatWind || firstTile.direction === hand.roundWind) {
                    result.details.push({ name: 'Seat/Prevalent wind pair', value: 2 });
                    result.total += 2;
                }
            }
        }
    }
    
    if (hand.isEdgeWait()) {
        result.details.push({ name: 'Edge wait', value: 2 });
        result.total += 2;
    }
    if (hand.isClosedWait()) {
        result.details.push({ name: 'Closed wait', value: 2 });
        result.total += 2;
    }
    if (hand.isSingleWait()) {
        result.details.push({ name: 'Single wait', value: 2 });
        result.total += 2;
    }
    
    if (hand.winningType === 'tsumo' && !isPinfu) {
        result.details.push({ name: 'Tsumo (self-draw)', value: 2 });
        result.total += 2;
    }
    
    // open pinfu award 2 fu
    if (hand.winningType === 'tsumo' && hand.openCombinaisons.length > 0 && result.total === 20) {
        result.details.push({ name: 'Open pinfu', value: 2 });
        result.total += 2;
    }
    
    return result;
};

PointCalculator.prototype.calculate = function(hand, han, fu) {
    if (han === 5) { // mangan
        if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 4000;
        if (hand.seatWind === 'east' && hand.winningType === 'ron') return 12000;
        if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 8000;
        if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 4000, nonDealer: 2000 };
    } else if (han >= 6 && han <= 7) { // haneman
        if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 6000;
        if (hand.seatWind === 'east' && hand.winningType === 'ron') return 18000;
        if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 12000;
        if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 6000, nonDealer: 3000 };
    } else if (han >= 8 && han <= 10) { // baiman
        if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 8000;
        if (hand.seatWind === 'east' && hand.winningType === 'ron') return 24000;
        if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 16000;
        if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 8000, nonDealer: 4000 };
    } else if (han >= 11 && han <= 12) { // sanbaiman
        if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 12000;
        if (hand.seatWind === 'east' && hand.winningType === 'ron') return 36000;
        if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 24000;
        if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 12000, nonDealer: 6000 };
    } else if (han >= 13) { // yakuman
        if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 16000;
        if (hand.seatWind === 'east' && hand.winningType === 'ron') return 48000;
        if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 32000;
        if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 16000, nonDealer: 8000 };
    }

    var points = fu * Math.pow(2, 2+han),
        dealerPoints = points * 2,
        result = 0;
        
    if (hand.seatWind === 'east') {
        if (hand.winningType === 'tsumo') {
            result = dealerPoints;
        } else if (hand.winningType === 'ron') {
            result = dealerPoints * 3;
        }
    } else {
        if (hand.winningType === 'tsumo') {
            result = {
                dealer: dealerPoints,
                nonDealer: points
            };
        } else if (hand.winningType === 'ron') {
            result = points * 4;
        }
    }
    
    // The result is rounded up to the next hundred.
    if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') {
        result.dealer = Math.ceil(result.dealer / 100) * 100;
        result.nonDealer = Math.ceil(result.nonDealer / 100) * 100;
    } else {
        result = Math.ceil(result / 100) * 100;
    }
    
    // exceed are limit at mangan
    if (hand.seatWind === 'east' && hand.winningType === 'tsumo' && result > 4000) {
        result = 4000;
    } else if (hand.seatWind === 'east' && hand.winningType === 'ron' && result > 12000) {
        result = 12000;
    } else if (hand.seatWind !== 'east' && hand.winningType === 'tsumo' && result.dealer > 4000 && result.nonDealer > 2000) {
        result.dealer = 4000;
        result.nonDealer = 2000;
    } else if (hand.seatWind !== 'east' && hand.winningType === 'ron' && result > 8000) {
        result = 8000;
    }

    return result;
};
