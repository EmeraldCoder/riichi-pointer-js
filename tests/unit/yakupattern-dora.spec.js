import { Dora } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, DragonTile, WindTile, TileFactory } from '@/core/tile-classes'

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
    expect(dora.check(hand)).toBe(0);
});

test("the dora tile (4 of dot) give 2 han because of the (5 of dot) pair", function() {
    hand.doraTiles = [TileFactory.create('dot', 4)];
    expect(dora.check(hand)).toBe(2);
});

test("with many dora", function() {
    hand.doraTiles = [TileFactory.create('dot', 4), TileFactory.create('dot', 3)];            
    expect(dora.check(hand)).toBe(5);
});

test("the dora tile (9 of dot) give 3 han because of the (1 of dot) pon", function() {
    hand.doraTiles = [TileFactory.create('dot', 9)];
    expect(dora.check(hand)).toBe(3);
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
    
    expect(dora.check(dragonHand)).toBe(3);
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
    
    expect(dora.check(dragonHand)).toBe(3);
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
    
    expect(dora.check(dragonHand)).toBe(3);
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
    
    expect(dora.check(windHand)).toBe(3);
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
    
    expect(dora.check(windHand)).toBe(3);
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
    
    expect(dora.check(windHand)).toBe(3);
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
    
    expect(dora.check(windHand)).toBe(3);
});
