TESTS.push(new TestYakuPatternSanAnkou());

function TestYakuPatternSanAnkou() {
    this.runTests = function() {
        var sanAnkou = new SanAnkou();
        
        var validHand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        test("San Ankou (3 concealed pons) valid hand", function(){
            ok(sanAnkou.check(validHand) === 2);
        });
        
        var validOpenHand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(5))
        ], [
            new Pon(new DotTile(4))
        ]);
        test("San Ankou (3 concealed pons) valid open hand", function(){
            ok(sanAnkou.check(validOpenHand) === 2);
        });
        
        var validHandWithKan = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Kan(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        test("San Ankou (3 concealed pons) valid hand with kan", function(){
            ok(sanAnkou.check(validHandWithKan) === 2);
        });
        
        var invalidHandWithLessThanThreeConcealedPon = new Hand([
            new Pon(new DotTile(3)),
            new Pair(new DotTile(5))
        ], [
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(4))
        ]);
        test("San Ankou (3 concealed pons) invalid hand with less than 3 concealed pons", function(){
            ok(sanAnkou.check(invalidHandWithLessThanThreeConcealedPon) === 0);
        });
        
    };
}
