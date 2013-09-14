TESTS.push(new TestYakuPatternDora());

function TestYakuPatternDora() {
    this.runTests = function() {
        var dora = new Dora();
        
        var hand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        
        test("no dora", function() {
            hand.doraTiles = [TileFactory.create('bamboo', 1)];
            ok(dora.check(hand) === 0);
        });
        
        test("the dora tile (4 of dot) give 2 han because of the (5 of dot) pair", function() {
            hand.doraTiles = [TileFactory.create('dot', 4)];
            ok(dora.check(hand) === 2);
        });
        
        test("with many dora", function() {
            hand.doraTiles = [TileFactory.create('dot', 4), TileFactory.create('dot', 3)];            
            ok(dora.check(hand) === 5);
        });
        
        test("the dora tile (9 of dot) give 3 han because of the (1 of dot) pon", function() {
            hand.doraTiles = [TileFactory.create('dot', 9)];
            ok(dora.check(hand) === 3);
        });
        
        // dragon direction tests
        test("the dora tile (red dragon) give 3 han because of the (white dragon) pon", function() {
            var dragonHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DragonTile('white')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            dragonHand.doraTiles = [TileFactory.create('dragon', 'red')];
            
            ok(dora.check(dragonHand) === 3);
        });
        test("the dora tile (white dragon) give 3 han because of the (green dragon) pon", function() {
            var dragonHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DragonTile('green')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            dragonHand.doraTiles = [TileFactory.create('dragon', 'white')];
            
            ok(dora.check(dragonHand) === 3);
        });
        test("the dora tile (green dragon) give 3 han because of the (red dragon) pon", function() {
            var dragonHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DragonTile('red')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            dragonHand.doraTiles = [TileFactory.create('dragon', 'green')];
            
            ok(dora.check(dragonHand) === 3);
        });
        
        // wind direction tests
        test("the dora tile (east wind) give 3 han because of the (south wind) pon", function() {
            var windHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new WindTile('south')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            windHand.doraTiles = [TileFactory.create('wind', 'east')];
            
            ok(dora.check(windHand) === 3);
        });
        test("the dora tile (south wind) give 3 han because of the (west wind) pon", function() {
            var windHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new WindTile('west')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            windHand.doraTiles = [TileFactory.create('wind', 'south')];
            
            ok(dora.check(windHand) === 3);
        });
        test("the dora tile (west wind) give 3 han because of the (north wind) pon", function() {
            var windHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new WindTile('north')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            windHand.doraTiles = [TileFactory.create('wind', 'west')];
            
            ok(dora.check(windHand) === 3);
        });
        test("the dora tile (north wind) give 3 han because of the (east wind) pon", function() {
            var windHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new WindTile('east')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            windHand.doraTiles = [TileFactory.create('wind', 'north')];
            
            ok(dora.check(windHand) === 3);
        });


    };
}
