TESTS.push(new TestYakuPatternUraDora());

function TestYakuPatternUraDora() {
    this.runTests = function() {
        var uraDora = new UraDora();
        
        var hand = new Hand([
            new Pon(new DotTile(1)),
            new Pon(new DotTile(2)),
            new Pon(new DotTile(3)),
            new Pon(new DotTile(4)),
            new Pair(new DotTile(5))
        ], []);
        hand.isRiichi = true;
        
        test("don't check ura-dora if not riichi", function() {
            var nonRiichiHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DotTile(2)),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            nonRiichiHand.uraDoraTiles = [TileFactory.create('dot', 2)];
            
            ok(uraDora.check(nonRiichiHand) === 0);
            
        });
        
        test("no ura-dora", function() {
            hand.uraDoraTiles = [TileFactory.create('bamboo', 1)];
            ok(uraDora.check(hand) === 0);
        });
        
        test("the ura-dora tile (4 of dot) give 2 han because of the (5 of dot) pair", function() {
            hand.uraDoraTiles = [TileFactory.create('dot', 4)];
            ok(uraDora.check(hand) === 2);
        });
        
        test("with many ura-dora", function() {
            hand.uraDoraTiles = [TileFactory.create('dot', 4), TileFactory.create('dot', 3)];            
            ok(uraDora.check(hand) === 5);
        });
        
        test("the ura-dora tile (9 of dot) give 3 han because of the (1 of dot) pon", function() {
            hand.uraDoraTiles = [TileFactory.create('dot', 9)];
            ok(uraDora.check(hand) === 3);
        });
        
        // dragon direction tests
        test("the ura-dora tile (red dragon) give 3 han because of the (white dragon) pon", function() {
            var dragonHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DragonTile('white')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            dragonHand.isRiichi = true;
            dragonHand.uraDoraTiles = [TileFactory.create('dragon', 'red')];
            
            ok(uraDora.check(dragonHand) === 3);
        });
        test("the ura-dora tile (white dragon) give 3 han because of the (green dragon) pon", function() {
            var dragonHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DragonTile('green')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            dragonHand.isRiichi = true;
            dragonHand.uraDoraTiles = [TileFactory.create('dragon', 'white')];
            
            ok(uraDora.check(dragonHand) === 3);
        });
        test("the ura-dora tile (green dragon) give 3 han because of the (red dragon) pon", function() {
            var dragonHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new DragonTile('red')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            dragonHand.isRiichi = true;
            dragonHand.uraDoraTiles = [TileFactory.create('dragon', 'green')];
            
            ok(uraDora.check(dragonHand) === 3);
        });
        
        // wind direction tests
        test("the ura-dora tile (east wind) give 3 han because of the (south wind) pon", function() {
            var windHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new WindTile('south')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            windHand.isRiichi = true;
            windHand.uraDoraTiles = [TileFactory.create('wind', 'east')];
            
            ok(uraDora.check(windHand) === 3);
        });
        test("the ura-dora tile (south wind) give 3 han because of the (west wind) pon", function() {
            var windHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new WindTile('west')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            windHand.isRiichi = true;
            windHand.uraDoraTiles = [TileFactory.create('wind', 'south')];
            
            ok(uraDora.check(windHand) === 3);
        });
        test("the ura-dora tile (west wind) give 3 han because of the (north wind) pon", function() {
            var windHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new WindTile('north')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            windHand.isRiichi = true;
            windHand.uraDoraTiles = [TileFactory.create('wind', 'west')];
            
            ok(uraDora.check(windHand) === 3);
        });
        test("the ura-dora tile (north wind) give 3 han because of the (east wind) pon", function() {
            var windHand = new Hand([
                new Pon(new DotTile(1)),
                new Pon(new WindTile('east')),
                new Pon(new DotTile(3)),
                new Pon(new DotTile(4)),
                new Pair(new DotTile(5))
            ], []);
            windHand.isRiichi = true;
            windHand.uraDoraTiles = [TileFactory.create('wind', 'north')];
            
            ok(uraDora.check(windHand) === 3);
        });


    };
}
