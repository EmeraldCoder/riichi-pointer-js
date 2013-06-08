TESTS.push(new TestYakuPatternItsu());

function TestYakuPatternItsu() {
    this.runTests = function() {
        var itsu = new Itsu();
        
        var validConcealedHand = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
            new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], []);
        test("itsu (pure straight) valid concealed hand", function(){
            ok(itsu.check(validConcealedHand) === 2);
        });
        
        var validOpenHand = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
            new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6))
        ], [
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("itsu (pure straight) valid open hand", function(){
            ok(itsu.check(validOpenHand) === 1);
        });
        
        var invalidHandWithoutOneToNineNumber = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], []);
        test("itsu (pure straight) invalid hand without one to nine number", function(){
            ok(itsu.check(invalidHandWithoutOneToNineNumber) === 0);
        });
        
        var invalidHandWithTwoSuit = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
            new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], []);
        test("itsu (pure straight) valid hand", function(){
            ok(itsu.check(invalidHandWithTwoSuit) === 0);
        });
    };
}
