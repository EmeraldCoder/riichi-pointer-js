TESTS.push(new TestYakuPatternRinshanKaihou());

function TestYakuPatternRinshanKaihou() {
    this.runTests = function() {
        var rinshanKaihou = new RinshanKaihou();
        
        test("rinshan kaihou (After Kan) valid hand", function(){
            var hand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Kan(new DotTile(4)),
                new Pair(new DotTile(5))
            ], [], 'east', 'east', 0, 0, 'tsumo', 'rinshan kaihou');
            ok(rinshanKaihou.check(hand) === 1);
        });
        
        test("rinshan kaihou (After Kan) invalid hand", function(){
            var hand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Kan(new DotTile(4)),
                new Pair(new DotTile(5))
            ], [], 'east', 'east', 0, 0, 'tsumo');
            ok(rinshanKaihou.check(hand) === 0);
        });

    };
}
