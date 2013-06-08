TESTS.push(new TestYakuPatternFanpaiSeatWind());

function TestYakuPatternFanpaiSeatWind() {
    this.runTests = function() {
        var fanpaiSeatWind = new FanpaiSeatWind();
        
        var validHand = new Hand([
            new Pon(new WindTile('west')),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], [], 'west');
        test("fanpai (seat wind) valid hand", function(){
            ok(fanpaiSeatWind.check(validHand) === 1);
        });
        
        var validHandWithKan = new Hand([
            new Kan(new WindTile('west')),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], [], 'west');
        test("fanpai (seat wind) valid hand with kan", function(){
            ok(fanpaiSeatWind.check(validHandWithKan) === 1);
        });
        
        var invalidHandWithWrongWindPon = new Hand([
            new Pon(new WindTile('north')),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], [], 'west');
        test("fanpai (seat wind) invalid hand with wrong wind pon", function(){
            ok(fanpaiSeatWind.check(invalidHandWithWrongWindPon) === 0);
        });
        
        var invalidHandWithoutWindPon = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ], [], 'west');
        test("fanpai (seat wind) invalid hand without wind pon", function(){
            ok(fanpaiSeatWind.check(invalidHandWithoutWindPon) === 0);
        });
        
    };
}
