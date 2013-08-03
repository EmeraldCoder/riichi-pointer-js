TESTS.push(new TestYakuPatternDoubleRiichi());

function TestYakuPatternDoubleRiichi() {
    this.runTests = function() {
        var doubleRiichi = new DoubleRiichi();
        
        var validHand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        validHand.isDoubleRiichi = true;
        test("double riichi valid hand", function(){
            ok(doubleRiichi.check(validHand) === 1);
        });
        
        var invalidHand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        test("double riichi valid hand", function(){
            ok(doubleRiichi.check(invalidHand) === 0);
        });

    };
}
