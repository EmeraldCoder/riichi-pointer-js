TESTS.push(new TestYakuPatternHonroutou());

function TestYakuPatternHonroutou() {
    this.runTests = function() {
        var honroutou = new Honroutou();
        var validHand = [
            new DragonTile('green'), new DragonTile('green'), new DragonTile('green'),
            new DragonTile('white'), new DragonTile('white'), new DragonTile('white'),
            new WindTile('east'), new WindTile('east'), new WindTile('east'),
            new DotTile(1), new DotTile(1), new DotTile(1),
            new BambooTile(9), new BambooTile(9)
        ];
        test("honroutou (all terminals & honors) valid hand", function(){
            ok(honroutou.check(validHand));
        });
        
        var invalidHandWithTileNotHonorOrTerminal = [
            new DragonTile('green'), new DragonTile('green'), new DragonTile('green'),
            new DragonTile('white'), new DragonTile('white'), new DragonTile('white'),
            new WindTile('east'), new WindTile('east'), new WindTile('east'),
            new DotTile(1), new DotTile(1), new DotTile(1),
            new BambooTile(5), new BambooTile(5)
        ];
        test("honroutou (all terminals & honors) invvalid hand with tiles not honor or terminal", function(){
            ok(honroutou.check(invalidHandWithTileNotHonorOrTerminal) == false);
        });
    };
}
