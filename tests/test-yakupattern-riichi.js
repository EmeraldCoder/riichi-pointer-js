TESTS.push(new TestYakuPatternRiichi());

function TestYakuPatternRiichi() {
    this.runTests = function() {
        var riichi = new Riichi();
        
        var validHand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        validHand.isRiichi = true;
        test("riichi valid hand", function(){
            ok(riichi.check(validHand) === 1);
        });
        
        var invalidHand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        test("riichi valid hand", function(){
            ok(riichi.check(invalidHand) === 0);
        });

    };
}
