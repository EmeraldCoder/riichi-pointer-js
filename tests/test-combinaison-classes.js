TESTS.push(new TestCombinaisonClasses());

function TestCombinaisonClasses() {
    this.runTests = function() {
        
        // pair test
        var pair = new Pair(new DragonTile('green'));
        test('pair is a combinaison', function() {
            ok(pair instanceof Combinaison);
        });
        test('pair is a pair', function() {
            ok(pair instanceof Pair);
        });
        test('pair has two tiles', function() {
            ok(pair.tiles.length == 2);
        });
        test('pair has two green dragon', function() {
            ok(pair.tiles[0] instanceof DragonTile && pair.tiles[0].color == 'green');
            ok(pair.tiles[1] instanceof DragonTile && pair.tiles[1].color == 'green');
        });
        
        // pon test
        var pon = new Pon(new WindTile('south'));
        test('pon is a combinaison', function() {
            ok(pon instanceof Combinaison);
        });
        test('pon is a pon', function() {
            ok(pon instanceof Pon);
        });
        test('pon has three tiles', function() {
            ok(pon.tiles.length == 3);
        });
        test('pon has three south wind', function() {
            ok(pon.tiles[0] instanceof WindTile && pon.tiles[0].direction == 'south');
            ok(pon.tiles[1] instanceof WindTile && pon.tiles[1].direction == 'south');
            ok(pon.tiles[2] instanceof WindTile && pon.tiles[2].direction == 'south');
        });
        
        // kan test
        var kan = new Kan(new DotTile(1));
        test('kan is a combinaison', function() {
            ok(kan instanceof Combinaison);
        });
        test('kan is a kan', function() {
            ok(kan instanceof Kan);
        });
        test('kan has four tiles', function() {
            ok(kan.tiles.length == 4);
        });
        test('kan has four 1 of dot', function() {
            ok(kan.tiles[0] instanceof DotTile && kan.tiles[0].number == 1);
            ok(kan.tiles[1] instanceof DotTile && kan.tiles[1].number == 1);
            ok(kan.tiles[2] instanceof DotTile && kan.tiles[2].number == 1);
            ok(kan.tiles[3] instanceof DotTile && kan.tiles[3].number == 1);
        });
        
        // chii test
        var chii = new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6));
        test('chii is a combinaison', function() {
            ok(chii instanceof Combinaison);
        });
        test('chii is a chii', function() {
            ok(chii instanceof Chii);
        });
        test('chii has three tiles', function() {
            ok(chii.tiles.length == 3);
        });
        test('chii has 4,5,6 of bamboo', function() {
            ok(chii.tiles[0] instanceof BambooTile && chii.tiles[0].number == 4);
            ok(chii.tiles[1] instanceof BambooTile && chii.tiles[1].number == 5);
            ok(chii.tiles[2] instanceof BambooTile && chii.tiles[2].number == 6);
        });
        
        // factory test
        test('CombinaisonFactory create pair', function(){
            var combinaison = CombinaisonFactory.create('pair', TileFactory.create('dot', 1));
            ok(combinaison instanceof Pair);
            ok(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1);
            ok(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1);
        });
        test('CombinaisonFactory create pon', function(){
            var combinaison = CombinaisonFactory.create('pon', TileFactory.create('dot', 1));
            ok(combinaison instanceof Pon);
            ok(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1);
            ok(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1);
            ok(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 1);
        });
        test('CombinaisonFactory create kan', function(){
            var combinaison = CombinaisonFactory.create('kan', TileFactory.create('dot', 1));
            ok(combinaison instanceof Kan);
            ok(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1);
            ok(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1);
            ok(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 1);
            ok(combinaison.tiles[3] instanceof DotTile && combinaison.tiles[3].value === 1);
        });
        test('CombinaisonFactory create chii', function(){
            var combinaison = CombinaisonFactory.create('chii', TileFactory.create('dot', 1));
            ok(combinaison instanceof Chii);
            ok(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1);
            ok(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 2);
            ok(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 3);
        });
        
    };
}
