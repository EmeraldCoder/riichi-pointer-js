TESTS.push(new TestHandClasses());

function TestHandClasses() {
    this.runTests = function() {
    
        // hand test
        var concealedHandCombinaisons = [
            new Pon(new DragonTile('white')),
            new Pon(new DotTile(6)),
            new Kan(new CharacterTile(9)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new WindTile('east'))
        ];
        var openHandCombinaisons = [];
        var hand = new Hand(concealedHandCombinaisons, openHandCombinaisons, 'east', 'north');
        test('hand has five concealed hand combinaison', function() {
            ok(hand.concealedCombinaisons.length === 5);
        });
        test('hand has zero open hand combinaison', function() {
            ok(hand.openCombinaisons.length === 0);
        });
        test('hand has five hand combinaison', function() {
            ok(hand.combinaisons.length === 5);
        });
        test('hand has valid combinaison', function() {
            ok(hand.concealedCombinaisons === concealedHandCombinaisons);
            ok(hand.openCombinaisons === openHandCombinaisons);
            ok(hand.seatWind === 'east');
            ok(hand.roundWind === 'north');
        });
        
        // hand isFinish() test
        var notFinishHandWhenEmpty = new Hand([], []);
        test('hand is not finish when empty', function() {
            ok(notFinishHandWhenEmpty.isFinish() === false);
        });
        
        var notFinishHandWhenNotEnoughCombinaison = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new DragonTile('white')),
            new Pon(new DragonTile('green')),
            new Pair(new WindTile('east'))
        ], []);
        test('hand is not finish when less than 4 combinaison', function(){
            ok(notFinishHandWhenNotEnoughCombinaison.isFinish() === false);
        });
        
        var notFinishHandWhenNoPair = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new DragonTile('white')),
            new Pon(new DragonTile('green')),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pon(new WindTile('east'))
        ], []);
        test('hand is not finish without a pair', function(){
            ok(notFinishHandWhenNoPair.isFinish() === false);
        });
        
        var finishHandWith4CombinaisonAnd1Pair = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new DragonTile('white')),
            new Pon(new DragonTile('green')),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new WindTile('east'))
        ], []);
        test('hand is finish with 4 combinaison and 1 pair', function(){
            ok(finishHandWith4CombinaisonAnd1Pair.isFinish() === true);
        });
        
        var finishHandWithSevenPairs = new Hand([
            new Pair(new DragonTile('red')),
            new Pair(new DragonTile('white')),
            new Pair(new DragonTile('green')),
            new Pair(new WindTile('east')),
            new Pair(new WindTile('west')),
            new Pair(new WindTile('north')),
            new Pair(new WindTile('south'))
        ], []);
        test('hand is finish with 7 pairs', function(){
            ok(finishHandWithSevenPairs.isFinish() === true);
        });
        
        // wait test
        var validTwoSidedWait = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'east', 0, 0);
        var validEdgeWait = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'east', 0, 2);
        var validClosedWait = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'east', 0, 1);
        var validSingleWait = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'east', 4, 0);
        test('hand is a two-sided wait', function(){
            ok(validTwoSidedWait.isSingleWait() === false);
            ok(validTwoSidedWait.isClosedWait() === false);
            ok(validTwoSidedWait.isEdgeWait() === false);
            ok(validTwoSidedWait.isTwoSidedWait() === true);
        });
        test('hand is a edge wait', function(){
            ok(validEdgeWait.isSingleWait() === false);
            ok(validEdgeWait.isClosedWait() === false);
            ok(validEdgeWait.isEdgeWait() === true);
            ok(validEdgeWait.isTwoSidedWait() === false);
        });
        test('hand is a closed wait', function(){
            ok(validClosedWait.isSingleWait() === false);
            ok(validClosedWait.isClosedWait() === true);
            ok(validClosedWait.isEdgeWait() === false);
            ok(validClosedWait.isTwoSidedWait() === false);
        });
        test('hand is a single wait', function(){
            ok(validSingleWait.isSingleWait() === true);
            ok(validSingleWait.isClosedWait() === false);
            ok(validSingleWait.isEdgeWait() === false);
            ok(validSingleWait.isTwoSidedWait() === false);
        });
        
    };
}
