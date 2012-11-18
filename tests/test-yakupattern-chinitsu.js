TESTS.push(new TestYakuPatternChinitsu());

function TestYakuPatternChinitsu() {
    this.runTests = function() {
        var chinitsu = new Chinitsu();
        var validHand = [
            new BambooTile(2), new BambooTile(3), new BambooTile(4),
            new BambooTile(6), new BambooTile(7), new BambooTile(8),
            new BambooTile(1), new BambooTile(1), new BambooTile(1),
            new BambooTile(9), new BambooTile(9), new BambooTile(9),
            new BambooTile(7), new BambooTile(7)
        ];
        test("chinitsu (full flush) valid hand", function(){
            ok(chinitsu.check(validHand));
        });
        
        var invalidHandWithHonorTiles = [
            new BambooTile(2), new BambooTile(3), new BambooTile(4),
            new BambooTile(6), new BambooTile(7), new BambooTile(8),
            new BambooTile(1), new BambooTile(1), new BambooTile(1),
            new BambooTile(9), new BambooTile(9), new BambooTile(9),
            new DragonTile('white'), new DragonTile('white')
        ];
        test("chinitsu (full flush) invalid hand with honor tile", function(){
            ok(chinitsu.check(invalidHandWithHonorTiles) == false);
        });
        
        var invalidHandWithTwoSuit = [
            new BambooTile(2), new BambooTile(3), new BambooTile(4),
            new BambooTile(6), new BambooTile(7), new BambooTile(8),
            new BambooTile(1), new BambooTile(1), new BambooTile(1),
            new DotTile(9), new DotTile(9), new DotTile(9),
            new BambooTile(7), new BambooTile(7)
        ];
        test("chinitsu (full flush) invalid hand with two suit", function(){
            ok(chinitsu.check(invalidHandWithTwoSuit) == false);
        });
    };
}
