TESTS.push(new TestYakuPatternHonroutou());

function TestYakuPatternHonroutou() {
    this.runTests = function() {
        var honroutou = new Honroutou();
        var validHand = new Hand([
            new Pon(new DragonTile('green')),
            new Pon(new DragonTile('white')),
            new Pon(new WindTile('east')),
            new Pon(new DotTile(1)),
            new Pair(new BambooTile(9))
        ], []);
        test("honroutou (all terminals & honors) valid hand", function(){
            ok(honroutou.check(validHand) === 2);
        });
        
        var invalidHandWithTileNotHonorOrTerminal = new Hand([
            new Pon(new DragonTile('green')),
            new Pon(new DragonTile('white')),
            new Pon(new WindTile('east')),
            new Pon(new DotTile(1)),
            new Pair(new BambooTile(5))
        ], []);
        test("honroutou (all terminals & honors) invvalid hand with tiles not honor or terminal", function(){
            ok(honroutou.check(invalidHandWithTileNotHonorOrTerminal) === 0);
        });
    };
}
