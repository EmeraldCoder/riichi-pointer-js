TESTS.push(new TestHandClasses());

function TestHandClasses() {
    this.runTests = function() {
    
        // hand test
        var concealedHandCombinaisons = [
            new Pon(new DragonTile('white')),
            new Pon(new DotTile(6)),
            new Kan(new CharacterTile(9)),
            new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
            new Pair(new WindTile('east'))
        ];
        var openHandCombinaisons = [];
        var hand = new Hand(concealedHandCombinaisons, openHandCombinaisons, 'east', 'north');
        test('hand has five concealed hand combinaison', function() {
            ok(hand.concealedCombinaisons.length === 5);
        });
        test('hand has zero open hand combinaison', function() {
            ok(hand.openCombinaisons.length === 0);
        });
        test('hand has five hand combinaison', function() {
            ok(hand.combinaisons.length === 5);
        });
        test('hand has valid combinaison', function() {
            ok(hand.concealedCombinaisons === concealedHandCombinaisons);
            ok(hand.openCombinaisons === openHandCombinaisons);
            ok(hand.seatWind === 'east');
            ok(hand.roundWind === 'north');
        });
        
        // pair test
        var pair = new Pair(new DragonTile('green'));
        test('pair is a hand combinaison', function() {
            ok(pair instanceof HandCombinaison);
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
        test('pon is a hand combinaison', function() {
            ok(pon instanceof HandCombinaison);
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
        test('kan is a hand combinaison', function() {
            ok(kan instanceof HandCombinaison);
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
        test('chii is a hand combinaison', function() {
            ok(chii instanceof HandCombinaison);
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
        
    };
}
