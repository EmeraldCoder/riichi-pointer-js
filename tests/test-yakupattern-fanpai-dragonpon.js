TESTS.push(new TestYakuPatternFanpaiDragonPon());

function TestYakuPatternFanpaiDragonPon() {
    this.runTests = function() {
        var fanpaiDragonPon = new FanpaiDragonPon();
        
        var validHand = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("fanpai (dragon pon) valid hand", function(){
            ok(fanpaiDragonPon.check(validHand));
        });
        
        var validHandWithTwoDragonPon = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new DragonTile('white')),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("fanpai (dragon pon) valid hand with two dragon pon", function(){
            ok(fanpaiDragonPon.check(validHandWithTwoDragonPon) == 2);
        });
        
        var validHandWithThreeDragonPon = new Hand([
            new Pon(new DragonTile('red')),
            new Pon(new DragonTile('white')),
            new Pon(new DragonTile('green')),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("fanpai (dragon pon) valid hand with three dragon pon", function(){
            ok(fanpaiDragonPon.check(validHandWithThreeDragonPon) == 3);
        });
        
        var validHandWithKan = new Hand([
            new Kan(new DragonTile('red')),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("fanpai (dragon pon) valid hand with kan", function(){
            ok(fanpaiDragonPon.check(validHandWithKan));
        });
        
        var invalidHandWithDragonPon = new Hand([
            new Kan(new BambooTile(1)),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("fanpai (dragon pon) invalid hand without dragon pon", function(){
            ok(fanpaiDragonPon.check(invalidHandWithDragonPon) == false);
        });
        
    };
}
