TESTS.push(new TestPointerFu());

function TestPointerFu() {
    this.runTests = function() {
        var fuCalculator = new FuCalculator();
        
        var concealedPointlessHand = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DotTile(5))
        ], [], 'east', 'east');
        var openPointlessHand = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DotTile(5))
        ], [
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3))
        ], 'east', 'east');
        
        // tsumo (20 pts)
        test("tsumo award 20 fu", function(){
            concealedPointlessHand.winningType = 'tsumo';
            ok(fuCalculator.calculate(concealedPointlessHand).total === 20);
            openPointlessHand.winningType = 'tsumo';
            ok(fuCalculator.calculate(openPointlessHand).total === 22); // +2 because of the open pinfu
        });
        
        // seven pairs (25 pts)
        test("seven pairs award 25 fu", function(){
            var sevenPairHandWithDragonAndWind = new Hand([
                new Pair(new DotTile(1)),
                new Pair(new DotTile(1)),
                new Pair(new DotTile(2)),
                new Pair(new DotTile(2)),
                new Pair(new DotTile(3)),
                new Pair(new WindTile('east')),
                new Pair(new DragonTile('red')),
            ], [], 'east', 'east');
            sevenPairHandWithDragonAndWind.winningType = 'tsumo';
            ok(fuCalculator.calculate(sevenPairHandWithDragonAndWind).total === 25);
            sevenPairHandWithDragonAndWind.winningType = 'ron';
            ok(fuCalculator.calculate(sevenPairHandWithDragonAndWind).total === 25);
        });
        
        // ron non-concealed (20 pts)
        test("ron non-concealed award 20 fu", function(){
            openPointlessHand.winningType = 'ron';
            ok(fuCalculator.calculate(openPointlessHand).total === 20);
        });
        
        // ron concealed (30 pts)
        test("ron concealed award 30 fu", function(){
            concealedPointlessHand.winningType = 'ron';
            ok(fuCalculator.calculate(concealedPointlessHand).total === 30);
        });
        
        // simple pon non-concealed (2 pts)
        test("simple pon non-conceal award 2 fu", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4))
            ], [
                new Pon(new CharacterTile(2))
            ]);
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 24); // +2 for tsumo not pinfu
        });
        
        // simple pon concealed (4 pts)
        test("simple pon concealed award 4 fu", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4)),
                new Pon(new CharacterTile(2))
            ], []);
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 26); // +2 for tsumo not pinfu
        });
        
        // terminal & honor pon non-concealed (4 pts)
        test("terminal & honor pon non-concealed award 4 fu", function(){
            var handWithTerminal = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4))
            ], [
                new Pon(new CharacterTile(1))
            ]);
            var handWithHonor = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4))
            ], [
                new Pon(new DragonTile('green'))
            ]);
            handWithTerminal.winningType = 'tsumo';
            ok(fuCalculator.calculate(handWithTerminal).total === 26); // +2 for tsumo not pinfu
            handWithHonor.winningType = 'tsumo';
            ok(fuCalculator.calculate(handWithHonor).total === 26); // +2 for tsumo not pinfu
        });
        
        // terminal & honor pon concealed (8 pts)
        test("terminal & honor pon concealed award 8 fu", function(){
            var handWithTerminal = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4)),
                new Pon(new CharacterTile(1))
            ], []);
            var handWithHonor = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4)),
                new Pon(new DragonTile('green'))
            ], []);
            handWithTerminal.winningType = 'tsumo';
            ok(fuCalculator.calculate(handWithTerminal).total === 30); // +2 for tsumo not pinfu
            handWithHonor.winningType = 'tsumo';
            ok(fuCalculator.calculate(handWithHonor).total === 30); // +2 for tsumo not pinfu
        });
        
        // simple kan non-concealed (8 pts)
        test("simple kan non-concealed award 8 pts", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4))
            ], [
                new Kan(new CharacterTile(2))
            ]);
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 30); // +2 for tsumo not pinfu
        });
        
        // simple kan concealed (16 pts)
        test("simple kan concealed award 16 pts", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4)),
                new Kan(new CharacterTile(2))
            ], []);
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 38); // +2 for tsumo not pinfu
        });
        
        // terminal & honor kan non-concealed (16 pts)
        test("terminal & honor kan non-concealed award 16 fu", function(){
            var handWithTerminal = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4))
            ], [
                new Kan(new CharacterTile(1))
            ]);
            var handWithHonor = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4))
            ], [
                new Kan(new DragonTile('green'))
            ]);
            handWithTerminal.winningType = 'tsumo';
            ok(fuCalculator.calculate(handWithTerminal).total === 38); // +2 for tsumo not pinfu
            handWithHonor.winningType = 'tsumo';
            ok(fuCalculator.calculate(handWithHonor).total === 38); // +2 for tsumo not pinfu
        });
        
        // terminal & honor kan concealed (32 pts)
        test("terminal & honor pon concealed award 8 fu", function(){
            var handWithTerminal = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4)),
                new Kan(new CharacterTile(1))
            ], []);
            var handWithHonor = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(4)),
                new Kan(new DragonTile('green'))
            ], []);
            handWithTerminal.winningType = 'tsumo';
            ok(fuCalculator.calculate(handWithTerminal).total === 54); // +2 for tsumo not pinfu
            handWithHonor.winningType = 'tsumo';
            ok(fuCalculator.calculate(handWithHonor).total === 54); // +2 for tsumo not pinfu
        });
        
        // dragon pair (2 pts)
        test("dragon pair award 2 fu", function(){
            var hand = new Hand([
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Pair(new DragonTile('green'))
            ], []);
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 24); // +2 for tsumo not pinfu
        });
        
        // seat wind pair (2 pts)
        test("seat wind pair award 2 fu", function(){
            var hand = new Hand([
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Pair(new WindTile('south'))
            ], [], 'south', 'east');
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 24); // +2 for tsumo not pinfu
        });
        
        // round wind pair (2 pts)
        test("round wind pair award 2 fu", function(){
            var hand = new Hand([
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Pair(new WindTile('east'))
            ], [], 'south', 'east');
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 24); // +2 for tsumo not pinfu
        });
        
        // edge wait (2 pts)
        test("edge wait award 2 fu", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(9))
            ], [], 'east', 'east', 0, 2);
            hand.winningType = 'ron';
            ok(fuCalculator.calculate(hand).total === 32);
        });
        
        // closed wait (2 pts)
        test("closed wait award 2 fu", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(9))
            ], [], 'east', 'east', 0, 1);
            hand.winningType = 'ron';
            ok(fuCalculator.calculate(hand).total === 32);
        });
        
        // single wait (2 pts)
        test("single wait award 2 fu", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(9))
            ], [], 'east', 'east', 4, 0);
            hand.winningType = 'ron';
            ok(fuCalculator.calculate(hand).total === 32);
        });
        
        // two-sided wait (0 pts)
        test("two-sided wait award 0 fu", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Pair(new DotTile(9))
            ], [], 'east', 'east', 0, 0);
            hand.winningType = 'ron';
            ok(fuCalculator.calculate(hand).total === 30);
        });
        
        // winning on a self-draw (except in case of pinfu) (2 pts)
        test("tsumo except in case of pinfu award 2 fu", function(){
            var hand = new Hand([
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new DotTile(4), new DotTile(5), new DotTile(6)),
                new Chii(new DotTile(4), new DotTile(5), new DotTile(6)),
                new Pair(new DragonTile('red'))
            ], [], 'east', 'east', 1, 2);
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 26); // +2 dragon pair, +2 edge wait
            hand.winningType = 'ron';
            ok(fuCalculator.calculate(hand).total === 34); // +2 dragon pair, +2 edge wait
        });
        
        // open pinfu (2 pts)
        test("open pinfu award 2 fu", function(){
            var hand = new Hand([
                new Pair(new DotTile(1))
            ], [
                new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
                new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new DotTile(5), new DotTile(6), new DotTile(7))
            ], 'east', 'east');
            hand.winningType = 'tsumo';
            ok(fuCalculator.calculate(hand).total === 22);
            hand.winningType = 'ron';
            ok(fuCalculator.calculate(hand).total === 20);
        });
        
    };
}
