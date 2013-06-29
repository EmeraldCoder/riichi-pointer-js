TESTS.push(new TestPointerFu());

function TestPointerFu() {
    this.runTests = function() {
        var fuCalculator = new FuCalculator();
        
        // tsumo (20 pts)
        test("tsumo award 30 fu", function(){
            var hand = new Hand([], []);
            ok(fuCalculator.calculate(hand, 'tsumo') === 20);
        });
        
        // seven pairs (25 pts)
        test("seven pairs award 25 fu", function(){
            var hand = new Hand([
                new Pair(new DotTile(1)),
                new Pair(new DotTile(1)),
                new Pair(new DotTile(2)),
                new Pair(new DotTile(2)),
                new Pair(new DotTile(3)),
                new Pair(new DotTile(3)),
                new Pair(new DotTile(4)),
            ], []);
            ok(fuCalculator.calculate(hand, 'tsumo') === 25);
            ok(fuCalculator.calculate(hand, 'ron') === 25);
        });
        
        // ron non-concealed (20 pts)
        test("ron non-concealed award 20 fu", function(){
            var hand = new Hand([
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Pair(new WindTile('south'))
            ], [
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
            ]);
            ok(fuCalculator.calculate(hand, 'ron') === 20);
        });
        
        // ron concealed (30 pts)
        test("ron concealed award 30 fu", function(){
            var hand = new Hand([
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Chii(new CharacterTile(1), new CharacterTile(2), new CharacterTile(3)),
                new Pair(new WindTile('south'))
            ], []);
            ok(fuCalculator.calculate(hand, 'ron') === 30);
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
            ok(fuCalculator.calculate(hand, 'tsumo') === 22);
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
            ok(fuCalculator.calculate(hand, 'tsumo') === 24);
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
            ok(fuCalculator.calculate(handWithTerminal, 'tsumo') === 24);
            ok(fuCalculator.calculate(handWithHonor, 'tsumo') === 24);
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
            ok(fuCalculator.calculate(handWithTerminal, 'tsumo') === 28);
            ok(fuCalculator.calculate(handWithHonor, 'tsumo') === 28);
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
            ok(fuCalculator.calculate(hand, 'tsumo') === 28);
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
            ok(fuCalculator.calculate(hand, 'tsumo') === 36);
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
            ok(fuCalculator.calculate(handWithTerminal, 'tsumo') === 36);
            ok(fuCalculator.calculate(handWithHonor, 'tsumo') === 36);
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
            ok(fuCalculator.calculate(handWithTerminal, 'tsumo') === 52);
            ok(fuCalculator.calculate(handWithHonor, 'tsumo') === 52);
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
            ok(fuCalculator.calculate(hand, 'tsumo') === 22);
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
            ok(fuCalculator.calculate(hand, 'tsumo') === 22);
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
            ok(fuCalculator.calculate(hand, 'tsumo') === 22);
        });
        
    };
}
