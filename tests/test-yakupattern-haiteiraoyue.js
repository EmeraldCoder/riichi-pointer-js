TESTS.push(new TestYakuPatternHaiteiRaoyue());

function TestYakuPatternHaiteiRaoyue() {
    this.runTests = function() {
        var haiteiRaoyue = new HaiteiRaoyue();
        
        test("haitei raoyue (Last Tile Draw) valid hand", function(){
            var hand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], [], 'east', 'east', 0, 0, 'tsumo', 'haitei raoyue');
            ok(haiteiRaoyue.check(hand) === 1);
        });
        
        test("haitei raoyue (Last Tile Draw) invalid hand", function(){
            var hand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], [], 'east', 'east', 0, 0, 'tsumo');
            ok(haiteiRaoyue.check(hand) === 0);
        });

    };
}
