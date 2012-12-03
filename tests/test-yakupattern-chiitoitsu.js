TESTS.push(new TestYakuPatternChiiToitsu());

function TestYakuPatternChiiToitsu() {
    this.runTests = function() {
        var chiiToitsu = new ChiiToitsu();
        
        var validHand = new Hand([
            new Pair(new BambooTile(1)),
            new Pair(new BambooTile(2)),
            new Pair(new BambooTile(3)),
            new Pair(new BambooTile(4)),
            new Pair(new BambooTile(5)),
            new Pair(new BambooTile(6)),
            new Pair(new BambooTile(7))
        ]);
        test("chii toitsu (seven pairs) valid hand", function(){
            ok(chiiToitsu.check(validHand));
        });

        var invalidHandWithoutSevenPairs = new Hand([
            new Pair(new BambooTile(1)),
            new Pair(new BambooTile(2)),
            new Pair(new BambooTile(3)),
            new Pair(new BambooTile(4)),
            new Pair(new BambooTile(5)),
            new Pair(new BambooTile(6)),
            new Pon(new BambooTile(7))
        ]);
        test("chii toitsu (seven pairs) invalid hand without seven pairs", function(){
            ok(chiiToitsu.check(invalidHandWithoutSevenPairs) == false);
        });
        
    };
}
