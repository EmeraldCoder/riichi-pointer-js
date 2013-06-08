TESTS.push(new TestYakuPatternSanShokuDoujun());

function TestYakuPatternSanShokuDoujun() {
    this.runTests = function() {
        var sanShokuDoujun = new SanShokuDoujun();
        
        var validHand = new Hand([
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
            new Chii(new CharacterTile(2), new CharacterTile(3), new CharacterTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("san shoku doujun (mixed triple chii) valid hand", function(){
            ok(sanShokuDoujun.check(validHand) === 2);
        });
        
        var invalidHandWithOnlyTwoChiiOfTheSameValue = new Hand([
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
            new Pon(new CharacterTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("san shoku doujun (mixed triple chii) invalid hand with only two chii of the same value", function(){
            ok(sanShokuDoujun.check(invalidHandWithOnlyTwoChiiOfTheSameValue) === 0);
        });
        
        var invalidHandWithoutThreeDifferentSuit = new Hand([
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
            new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("san shoku doujun (mixed triple chii) invalid hand without three different suit", function(){
            ok(sanShokuDoujun.check(invalidHandWithoutThreeDifferentSuit) === 0);
        });
    };
}
