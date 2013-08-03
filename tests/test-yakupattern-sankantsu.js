TESTS.push(new TestYakuPatternSanKanTsu());

function TestYakuPatternSanKanTsu() {
    this.runTests = function() {
        var sanKanTsu = new SanKanTsu();
        
        var validHand = new Hand([
            new Kan(new DotTile(1)),
            new Kan(new DotTile(2)),
            new Kan(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(6))
        ], []);
        test("San Kan Tsu (3 kans) valid hand", function(){
            ok(sanKanTsu.check(validHand) === 2);
        });
        
        var validHandWithOpenKan = new Hand([
            new Kan(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(6))
        ], [
            new Kan(new DotTile(1)),
            new Kan(new DotTile(2))
        ]);
        test("San Kan Tsu (3 kans) valid hand with open kan", function(){
            ok(sanKanTsu.check(validHandWithOpenKan) === 2);
        });
        
        var invalidHandWithLessThanThreeKan = new Hand([
            new Kan(new DotTile(1)),
            new Kan(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(6))
        ], []);
        test("San Kan Tsu (3 kans) invalid hand with less than three kan", function(){
            ok(sanKanTsu.check(invalidHandWithLessThanThreeKan) === 0);
        });

    };
}
