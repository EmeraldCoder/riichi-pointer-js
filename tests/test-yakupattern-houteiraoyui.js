TESTS.push(new TestYakuPatternHouteiRaoyui());

function TestYakuPatternHouteiRaoyui() {
    this.runTests = function() {
        var houteiRaoyui = new HouteiRaoyui();
        
        test("houtei raoyui (Last Tile Discard) valid hand", function(){
            var hand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], [], 'east', 'east', 0, 0, 'ron', 'houtei raoyui');
            ok(houteiRaoyui.check(hand) === 1);
        });
        
        test("haitei raoyue (Last Tile Discard) invalid hand", function(){
            var hand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], [], 'east', 'east', 0, 0, 'ron');
            ok(houteiRaoyui.check(hand) === 0);
        });

    };
}
