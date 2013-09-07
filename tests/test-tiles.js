TESTS.push(new TestTiles());

function TestTiles() {
    this.runTests = function() {
        // ---------------------
        // dragon tile tests
        // ---------------------
        var dragonTile = new DragonTile("white");
        test("dragon tile color", function(){
            ok(dragonTile.color == "white");
        });
        test("dragon tile is a tile", function(){
            ok(dragonTile instanceof Tile);
        });
        test("dragon tile is a honor tile", function(){
            ok(dragonTile instanceof HonorTile);
        });
        test("dragon tile is not a numbered tile", function(){
            ok(dragonTile instanceof NumberedTile == false);
        });
        test("dragon tile is a dragon tile", function(){
            ok(dragonTile instanceof DragonTile);
        });
            
        // ---------------------
        // wind tile tests
        // ---------------------
        var windTile = new WindTile("north");
        test("wind tile direction", function(){
            ok(windTile.direction == "north");
        });
        test("wind tile is a tile", function(){
            ok(windTile instanceof Tile);
        });
        test("wind tile is a honor tile", function(){
            ok(windTile instanceof HonorTile);
        });
        test("wind tile is not a numbered tile", function(){
            ok(windTile instanceof NumberedTile == false);
        });
        test("wind tile is a wind tile", function(){
            ok(windTile instanceof WindTile);
        });
            
        // ---------------------
        // dot tile tests
        // ---------------------
        var dotTile = new DotTile(1);
        test("dot tile number", function(){
            ok(dotTile.number == 1);
        });
        test("dot tile is a tile", function(){
            ok(dotTile instanceof Tile);
        });
        test("dot tile is not a honor tile", function(){
            ok(dotTile instanceof HonorTile == false);
        });
        test("dot tile is a numbered tile", function(){
            ok(dotTile instanceof NumberedTile);
        });
        test("dot tile is a dot tile", function(){
            ok(dotTile instanceof DotTile);
        });
            
        // ---------------------
        // character tile tests
        // ---------------------
        var characterTile = new CharacterTile(2);
        test("character tile number", function(){
            ok(characterTile.number == 2);
        });
        test("character tile is a tile", function(){
            ok(characterTile instanceof Tile);
        });
        test("character tile is not a honor tile", function(){
            ok(characterTile instanceof HonorTile == false);
        });
        test("character tile is a numbered tile", function(){
            ok(characterTile instanceof NumberedTile);
        });
        test("character tile is a character tile", function(){
            ok(characterTile instanceof CharacterTile);
        });
            
        // ---------------------
        // bamboo tile tests
        // ---------------------
        var bambooTile = new BambooTile(3);
        test("bamboo tile number", function(){
            ok(bambooTile.number == 3);
        });
        test("bamboo tile is a tile", function(){
            ok(bambooTile instanceof Tile);
        });
        test("bamboo tile is not a honor tile", function(){
            ok(bambooTile instanceof HonorTile == false);
        });
        test("bamboo tile is a numbered tile", function(){
            ok(bambooTile instanceof NumberedTile);
        });
        test("bamboo tile is a bamboo tile", function(){
            ok(bambooTile instanceof BambooTile);
        });
        
        // ---------------------
        // tile factory tests
        // ---------------------
        test("tile factory create dragon tile", function(){
            var tile = TileFactory.create("dragon", "red");
            ok(tile instanceof DragonTile && tile.color === "red");
        });
        test("tile factory create wind tile", function(){
            var tile = TileFactory.create("wind", "south");
            ok(tile instanceof WindTile && tile.direction === "south");
        });
        test("tile factory create bamboo tile", function(){
            var tile = TileFactory.create("bamboo", 5);
            ok(tile instanceof BambooTile && tile.value === 5);
        });
        test("tile factory create dot tile", function(){
            var tile = TileFactory.create("dot", 3);
            ok(tile instanceof DotTile && tile.value === 3);
        });
        test("tile factory create character tile", function(){
            var tile = TileFactory.create("character", 6);
            ok(tile instanceof CharacterTile && tile.value === 6);
        });
    }
}
