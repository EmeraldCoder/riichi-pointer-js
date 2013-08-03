TESTS.push(new TestYakuPatternChanKan());

function TestYakuPatternChanKan() {
    this.runTests = function() {
        var chanKan = new ChanKan();
        
        test("chan kan (Robbing the kan) valid hand", function(){
            var hand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], [], 'east', 'east', 0, 0, 'ron', 'chan kan');
            ok(chanKan.check(hand) === 1);
        });
        
        test("chan kan (Robbing the kan) invalid hand", function(){
            var hand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], [], 'east', 'east', 0, 0, 'ron');
            ok(chanKan.check(hand) === 0);
        });

    };
}
