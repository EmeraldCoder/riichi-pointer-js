TESTS.push(new TestYakuPatternShouSangen());

function TestYakuPatternShouSangen() {
    this.runTests = function() {
        var shouSangen = new ShouSangen();
        
        var validHand = new Hand([
            new Pon(new DragonTile("red")),
            new Pon(new DragonTile("green")),
            new Pair(new DragonTile("white")),
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2))
        ]);
        test("shou sangen (little three dragons) valid hand", function(){
            ok(shouSangen.check(validHand) === 2);
        });

        var validHandWithKan = new Hand([
            new Pon(new DragonTile("red")),
            new Kan(new DragonTile("green")),
            new Pair(new DragonTile("white")),
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2))
        ]);
        test("shou sangen (little three dragons) valid hand with kan", function(){
            ok(shouSangen.check(validHandWithKan) === 2);
        });

        var invalidHandWithoutDragonPair = new Hand([
            new Pon(new DragonTile("red")),
            new Pon(new DragonTile("green")),
            new Pair(new WindTile("east")),
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2))
        ]);
        test("shou sangen (little three dragons) invalid hand without dragon pair", function(){
            ok(shouSangen.check(invalidHandWithoutDragonPair) === 0);
        });

        var invalidHandWithoutTwoDragonPon = new Hand([
            new Pon(new DragonTile("red")),
            new Pon(new WindTile("north")),
            new Pair(new DragonTile("white")),
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2))
        ]);
        test("shou sangen (little three dragons) invalid hand without two dragon pon", function(){
            ok(shouSangen.check(invalidHandWithoutTwoDragonPon) === 0);
        });


        
    };
}
