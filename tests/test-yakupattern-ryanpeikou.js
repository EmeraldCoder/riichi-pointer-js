TESTS.push(new TestYakuPatternRyanPeikou());

function TestYakuPatternRyanPeikou() {
    this.runTests = function() {
        var ryanPeikou = new RyanPeikou();
        
        var validHand = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
            new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
            new Pair(new DotTile(1))
        ]);
        test("ryan peikou (twice pure double chiis) valid hand", function(){
            ok(ryanPeikou.check(validHand));
        });
        
        var invalidHandWitoutTwoPairOfChii = new Hand([
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
            new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DotTile(1))
        ]);
        test("ryan peikou (twice pure double chiis) invalid hand without two pair of chii", function(){
            ok(ryanPeikou.check(invalidHandWitoutTwoPairOfChii) == false);
        });
        
        var invalidHandWithoutChii = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2)),
            new Pon(new DotTile(7)),
            new Pon(new DotTile(1)),
            new Pair(new DotTile(1))
        ]);
        test("ryan peikou (twice pure double chiis) invalid hand without chii", function(){
            ok(ryanPeikou.check(invalidHandWithoutChii) == false);
        });
        
    };
}
