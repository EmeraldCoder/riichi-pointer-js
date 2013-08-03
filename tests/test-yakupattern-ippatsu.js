TESTS.push(new TestYakuPatternIppatsu());

function TestYakuPatternIppatsu() {
    this.runTests = function() {
        var ippatsu = new Ippatsu();
        
        var validHand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        validHand.isIppatsu = true;
        test("ippatsu valid hand", function(){
            ok(ippatsu.check(validHand) === 1);
        });
        
        var invalidHand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        test("ippatsu valid hand", function(){
            ok(ippatsu.check(invalidHand) === 0);
        });

    };
}
