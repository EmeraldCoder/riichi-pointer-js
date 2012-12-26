TESTS.push(new TestYakuPatternFanpaiRoundWind());

function TestYakuPatternFanpaiRoundWind() {
    this.runTests = function() {
        var fanpaiRoundWind = new FanpaiRoundWind();
        
        var validHand = new Hand([
            new Pon(new WindTile('north')),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], 'west', 'north');
        test("fanpai (round wind) valid hand", function(){
            ok(fanpaiRoundWind.check(validHand));
        });
        
        var validHandWithKan = new Hand([
            new Kan(new WindTile('north')),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], 'west', 'north');
        test("fanpai (round wind) valid hand with kan", function(){
            ok(fanpaiRoundWind.check(validHandWithKan));
        });
        
        var invalidHandWithWrongWindPon = new Hand([
            new Pon(new WindTile('west')),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], 'west', 'north');
        test("fanpai (round wind) invalid hand with wrong wind pon", function(){
            ok(fanpaiRoundWind.check(invalidHandWithWrongWindPon) == false);
        });
        
        var invalidHandWithoutWindPon = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], 'west', 'north');
        test("fanpai (round wind) invalid hand without wind pon", function(){
            ok(fanpaiRoundWind.check(invalidHandWithoutWindPon) == false);
        });
        
    };
}
