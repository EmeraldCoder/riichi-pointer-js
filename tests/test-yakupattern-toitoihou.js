TESTS.push(new TestYakuPatternToiToiHou());

function TestYakuPatternToiToiHou() {
    this.runTests = function() {
        var toiToiHou = new ToiToiHou();
        
        var validHand = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Pon(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("toi-toi hou (all pons) valid hand", function(){
            ok(toiToiHou.check(validHand) === 2);
        });

        var validHandWithKan = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Kan(new DotTile(3)),
            new Pair(new DotTile(7))
        ]);
        test("toi-toi hou (all pons) valid hand with kan", function(){
            ok(toiToiHou.check(validHandWithKan) === 2);
        });

        var invalidHandWithoutFourPon = new Hand([
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(7)),
            new Pon(new BambooTile(4)),
            new Chii(new DotTile(3), new DotTile(4), new DotTile(5)),
            new Pair(new DotTile(7))
        ]);
        test("toi-toi hou (all pons) invalid hand without four pon", function(){
            ok(toiToiHou.check(invalidHandWithoutFourPon) === 0);
        });

        
    };
}
