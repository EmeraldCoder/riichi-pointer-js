TESTS.push(new TestYakuPatternSanShokuDokou());

function TestYakuPatternSanShokuDokou() {
    this.runTests = function() {
        var sanShokuDokou = new SanShokuDokou();
        
        var validHand = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new DotTile(1)),
            new Pon(new CharacterTile(1)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("san shoku dokou (triple pon) valid hand", function(){
            ok(sanShokuDokou.check(validHand) === 2);
        });

        var invalidHandWithoutThreeSamePon = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new DotTile(1)),
            new Pon(new CharacterTile(2)),
            new Pon(new DotTile(3)),
            new Pair( new DotTile(7))
        ]);
        test("san shoku dokou (triple pon) invalid hand without three same pon", function() {
            ok(sanShokuDokou.check(invalidHandWithoutThreeSamePon) === 0);
        });
        
    };
}
