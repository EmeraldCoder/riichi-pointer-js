TESTS.push(new TestYakuPatternChanta());

function TestYakuPatternChanta() {
    this.runTests = function() {
        var chanta = new Chanta();
        
        var validConcealedHand = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DragonTile("red")),
            new Pair(new DotTile(1))
        ], []);
        test("chanta (outside hand) valid concealed hand", function(){
            ok(chanta.check(validConcealedHand) === 2);
        });
        
        var validOpenHand = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3))
        ], [
            new Pon(new DragonTile("red")),
            new Pair(new DotTile(1))
        ]);
        test("chanta (outside hand) valid open hand", function(){
            ok(chanta.check(validOpenHand) === 1);
        });
        
        var invalidHandWithoutChii = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(9)),
            new Pon(new DotTile(1)),
            new Pon(new DragonTile("red")),
            new Pair(new DotTile(9))
        ], []);
        test("chanta (outside hand) invalid without one chii", function(){
            ok(chanta.check(invalidHandWithoutChii) === 0);
        });

        // check for terminals
        var invalidHandWithSetWithoutTerminalOrHonor = new Hand([
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DragonTile("red")),
            new Pair(new DotTile(1))
        ], []);
        test("chanta (outside hand) invalid hand with set without terminal or honor", function(){
            ok(chanta.check(invalidHandWithSetWithoutTerminalOrHonor) === 0);
        });

        // check of honor tiles
        var invalidHandWithSetWithoutTerminalOrHonor2 = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(1))
        ], []);
        test("chanta (outside hand) invalid hand with set without terminal or honor", function(){
            ok(chanta.check(invalidHandWithSetWithoutTerminalOrHonor2) === 0);
        });

    };
}
