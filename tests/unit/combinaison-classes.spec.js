import { Pair, Pon, Kan, Chii, Combinaison, CombinaisonFactory } from '@/core/combinaison-classes'
import { WindTile, DragonTile, DotTile, BambooTile, TileFactory } from '@/core/tile-classes'

// pair test
var pair = new Pair(new DragonTile('green'));
test('pair is a combinaison', function() {
    expect(pair instanceof Combinaison).toBeTruthy();
});
test('pair is a pair', function() {
    expect(pair instanceof Pair).toBeTruthy();
});
test('pair has two tiles', function() {
    expect(pair.tiles.length).toBe(2);
});
test('pair has two green dragon', function() {
    expect(pair.tiles[0] instanceof DragonTile && pair.tiles[0].color == 'green').toBeTruthy();
    expect(pair.tiles[1] instanceof DragonTile && pair.tiles[1].color == 'green').toBeTruthy();
});

// pon test
var pon = new Pon(new WindTile('south'));
test('pon is a combinaison', function() {
    expect(pon instanceof Combinaison).toBeTruthy();
});
test('pon is a pon', function() {
    expect(pon instanceof Pon).toBeTruthy();
});
test('pon has three tiles', function() {
    expect(pon.tiles.length).toBe(3);
});
test('pon has three south wind', function() {
    expect(pon.tiles[0] instanceof WindTile && pon.tiles[0].direction == 'south').toBeTruthy();
    expect(pon.tiles[1] instanceof WindTile && pon.tiles[1].direction == 'south').toBeTruthy();
    expect(pon.tiles[2] instanceof WindTile && pon.tiles[2].direction == 'south').toBeTruthy();
});

// kan test
var kan = new Kan(new DotTile(1));
test('kan is a combinaison', function() {
    expect(kan instanceof Combinaison).toBeTruthy();
});
test('kan is a kan', function() {
    expect(kan instanceof Kan).toBeTruthy();
});
test('kan has four tiles', function() {
    expect(kan.tiles.length).toBe(4);
});
test('kan has four 1 of dot', function() {
    expect(kan.tiles[0] instanceof DotTile && kan.tiles[0].number == 1).toBeTruthy();
    expect(kan.tiles[1] instanceof DotTile && kan.tiles[1].number == 1).toBeTruthy();
    expect(kan.tiles[2] instanceof DotTile && kan.tiles[2].number == 1).toBeTruthy();
    expect(kan.tiles[3] instanceof DotTile && kan.tiles[3].number == 1).toBeTruthy();
});

// chii test
var chii = new Chii(new BambooTile(4), new BambooTile(5), new BambooTile(6));
test('chii is a combinaison', function() {
    expect(chii instanceof Combinaison).toBeTruthy();
});
test('chii is a chii', function() {
    expect(chii instanceof Chii).toBeTruthy();
});
test('chii has three tiles', function() {
    expect(chii.tiles.length).toBe(3);
});
test('chii has 4,5,6 of bamboo', function() {
    expect(chii.tiles[0] instanceof BambooTile && chii.tiles[0].number == 4).toBeTruthy();
    expect(chii.tiles[1] instanceof BambooTile && chii.tiles[1].number == 5).toBeTruthy();
    expect(chii.tiles[2] instanceof BambooTile && chii.tiles[2].number == 6).toBeTruthy();
});

// factory test
test('CombinaisonFactory create pair', function(){
    var combinaison = CombinaisonFactory.create('pair', TileFactory.create('dot', 1));
    expect(combinaison instanceof Pair).toBeTruthy();
    expect(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1).toBeTruthy();
    expect(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1).toBeTruthy();
});
test('CombinaisonFactory create pon', function(){
    var combinaison = CombinaisonFactory.create('pon', TileFactory.create('dot', 1));
    expect(combinaison instanceof Pon).toBeTruthy();
    expect(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1).toBeTruthy();
    expect(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1).toBeTruthy();
    expect(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 1).toBeTruthy();
});
test('CombinaisonFactory create kan', function(){
    var combinaison = CombinaisonFactory.create('kan', TileFactory.create('dot', 1));
    expect(combinaison instanceof Kan).toBeTruthy();
    expect(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1).toBeTruthy();
    expect(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 1).toBeTruthy();
    expect(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 1).toBeTruthy();
    expect(combinaison.tiles[3] instanceof DotTile && combinaison.tiles[3].value === 1).toBeTruthy();
});
test('CombinaisonFactory create chii', function(){
    var combinaison = CombinaisonFactory.create('chii', TileFactory.create('dot', 1));
    expect(combinaison instanceof Chii).toBeTruthy();
    expect(combinaison.tiles[0] instanceof DotTile && combinaison.tiles[0].value === 1).toBeTruthy();
    expect(combinaison.tiles[1] instanceof DotTile && combinaison.tiles[1].value === 2).toBeTruthy();
    expect(combinaison.tiles[2] instanceof DotTile && combinaison.tiles[2].value === 3).toBeTruthy();
});
