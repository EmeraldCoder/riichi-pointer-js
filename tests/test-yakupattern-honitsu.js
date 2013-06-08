TESTS.push(new TestYakuPatternHonitsu());

function TestYakuPatternHonitsu() {
    this.runTests = function() {
        var honitsu = new Honitsu();
    
        var validHand = new Hand([
            new Pair(new DragonTile('green')),
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2)),
            new Pon(new BambooTile(3)),
            new Pon(new BambooTile(4))
        ], []);
        test("honitsu (half flush) valid hand", function(){
            ok(honitsu.check(validHand) === 3);
        });
        
        var validHandWithOpenCombinaison = new Hand([
            new Pair(new DragonTile('green')),
            new Pon(new BambooTile(3)),
            new Pon(new BambooTile(4))
        ], [
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2)),
        ]);
        test("honitsu (half flush) valid hand with open combinaison", function(){
            ok(honitsu.check(validHandWithOpenCombinaison) === 2);
        });
        
        var invalidHandWithoutHonorTile = new Hand([
            new Pon(new BambooTile(9)),
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2)),
            new Pon(new BambooTile(3)),
            new Pair(new BambooTile(4))
        ], []);
        test("honitsu (half flush) invalid hand without honor tile", function() {
            ok(honitsu.check(invalidHandWithoutHonorTile) === 0);
        });
        
        var invalidHandWithTwoSuit = new Hand([
            new Pair(new DragonTile('green')),
            new Pon(new BambooTile(1)),
            new Pon(new BambooTile(2)),
            new Pon(new BambooTile(3)),
            new Pon(new DotTile(4))
        ], []);
        test("honitsu (half flush) invalid hand with two suit", function(){
            ok(honitsu.check(invalidHandWithTwoSuit) === 0);
        });
    };
}
