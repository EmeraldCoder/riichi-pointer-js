TESTS.push(new TestYakuPatternHonitsu());

function TestYakuPatternHonitsu() {
    this.runTests = function() {
        var honitsu = new Honitsu();
    
        var validHand = [
            new DragonTile('green'), new DragonTile('green'),
            new BambooTile(1), new BambooTile(1), new BambooTile(1),
            new BambooTile(2), new BambooTile(2), new BambooTile(2),
            new BambooTile(3), new BambooTile(3), new BambooTile(3),
            new BambooTile(4), new BambooTile(4), new BambooTile(4)
        ];
        test("honitsu (half flush) valid hand", function(){
            ok(honitsu.check(validHand));
        });
        
        var invalidHandWithoutHonorTile = [
            new BambooTile(9), new BambooTile(9), new BambooTile(9),
            new BambooTile(1), new BambooTile(1), new BambooTile(1),
            new BambooTile(2), new BambooTile(2), new BambooTile(2),
            new BambooTile(3), new BambooTile(3), new BambooTile(3),
            new BambooTile(4), new BambooTile(4), new BambooTile(4)
        ];
        test("honitsu (half flush) invalid hand without honor tile", function() {
            ok(honitsu.check(invalidHandWithoutHonorTile) == false);
        });
        
        var invalidHandWithTwoSuit = [
            new DragonTile('green'), new DragonTile('green'),
            new BambooTile(1), new BambooTile(1), new BambooTile(1),
            new BambooTile(2), new BambooTile(2), new BambooTile(2),
            new BambooTile(3), new BambooTile(3), new BambooTile(3),
            new DotTile(4), new DotTile(4), new DotTile(4)
        ];
        test("honitsu (half flush) invalid hand with two suit", function(){
            ok(honitsu.check(invalidHandWithTwoSuit) == false);
        });
    };
}
