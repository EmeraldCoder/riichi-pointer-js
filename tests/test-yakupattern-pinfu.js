TESTS.push(new TestYakuPatternPinfu());

function TestYakuPatternPinfu() {
    this.runTests = function() {
        var pinfu = new Pinfu();
        
        var validHand = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'south', 0, 0);
        test("pinfu (all chii / no point) valid hand", function(){
            ok(pinfu.check(validHand) === 1);
        });
        
        var invalidHandWithDragonPair = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DragonTile('red'))
        ], [], 'east', 'south', 0, 0);
        test("pinfu (all chii / no point) invalid hand with a dragon pair", function(){
            ok(pinfu.check(invalidHandWithDragonPair) === 0);
        });
        
        var invalidHandWithSeatWindPair = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new WindTile('east'))
        ], [], 'east', 'south', 0, 0);
        test("pinfu (all chii / no point) invalid hand with a seat wind pair", function(){
            ok(pinfu.check(invalidHandWithSeatWindPair) === 0);
        });
        
        var invalidHandWithPrevalentWindPair = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new WindTile('south'))
        ], [], 'east', 'south', 0, 0);
        test("pinfu (all chii / no point) invalid hand with a prevalent wind pair", function(){
            ok(pinfu.check(invalidHandWithPrevalentWindPair) === 0);
        });
        
        var invalidHandWithPon = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pon(new DotTile(7)),
            new Pair(new DotTile(9))
        ], [], 'east', 'south', 0, 0);
        test("pinfu (all chii / no point) invalid hand with a pon", function(){
            ok(pinfu.check(invalidHandWithPon) === 0);
        }); 
        
        var invalidHandWithKan = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Kan(new DotTile(7)),
            new Pair(new DotTile(9))
        ], [], 'east', 'south', 0, 0);
        test("pinfu (all chii / no point) invalid hand with a kan", function(){
            ok(pinfu.check(invalidHandWithKan) === 0);
        });
        
        var invalidHandWhenOpen = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DotTile(9))
        ], [
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3))
        ], 'east', 'south', 0, 0);
        test("pinfu (all chii / no point) invalid hand when open", function(){
            ok(pinfu.check(invalidHandWhenOpen) === 0);
        });
        
        var invalidHandWithEdgeWait = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'south', 0, 2);
        test("pinfu (all chii / no point) invalid hand with an edge wait", function(){
            ok(pinfu.check(invalidHandWithEdgeWait) === 0)
        });
        
        var invalidHandWithClosedWait = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'south', 0, 1);
        test("pinfu (all chii / no point) invalid hand with a closed wait", function(){
            ok(pinfu.check(invalidHandWithClosedWait) === 0)
        });
        
        var invalidHandWithSingleWait = new Hand([
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new DotTile(9))
        ], [], 'east', 'south', 4, 0);
        test("pinfu (all chii / no point) invalid hand with a single wait", function(){
            ok(pinfu.check(invalidHandWithSingleWait) === 0)
        });

    };
}
