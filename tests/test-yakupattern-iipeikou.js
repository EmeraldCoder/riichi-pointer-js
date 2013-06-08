TESTS.push(new TestYakuPatternIipeikou());

function TestYakuPatternIipeikou() {
    this.runTests = function() {
        var iipeikou = new Iipeikou();
        
        var validHand = new Hand([
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("iipeikou (pure double chii) valid hand", function(){
            ok(iipeikou.check(validHand) === 1);
        });
        
        // test with different number
        var invalidHandWithoutTwoIdenticalChii1 = new Hand([
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new BambooTile(3), new BambooTile(4), new BambooTile(5)),
            new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("iipeikou (pure double chii) invalid hand without two identical chii", function(){
            ok(iipeikou.check(invalidHandWithoutTwoIdenticalChii1) === 0);
        });
        
        // test with different suit
        var invalidHandWithoutTwoIdenticalChii2 = new Hand([
            new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
            new Chii(new DotTile(2), new DotTile(3), new DotTile(4)),
            new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("iipeikou (pure double chii) invalid hand without two identical chii", function(){
            ok(iipeikou.check(invalidHandWithoutTwoIdenticalChii2) === 0);
        });
    };
}
