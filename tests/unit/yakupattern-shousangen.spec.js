import { ShouSangen } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Kan } from '@/core/combinaison-classes'
import { BambooTile, DragonTile, WindTile } from '@/core/tile-classes'

var shouSangen = new ShouSangen();

var validHand = new Hand([
    new Pon(new DragonTile("red")),
    new Pon(new DragonTile("green")),
    new Pair(new DragonTile("white")),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2))
], []);
test("shou sangen (little three dragons) valid hand", function(){
    expect(shouSangen.check(validHand)).toBe(2);
});

var validHandWithKan = new Hand([
    new Pon(new DragonTile("red")),
    new Kan(new DragonTile("green")),
    new Pair(new DragonTile("white")),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2))
], []);
test("shou sangen (little three dragons) valid hand with kan", function(){
    expect(shouSangen.check(validHandWithKan)).toBe(2);
});

var invalidHandWithoutDragonPair = new Hand([
    new Pon(new DragonTile("red")),
    new Pon(new DragonTile("green")),
    new Pair(new WindTile("east")),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2))
], []);
test("shou sangen (little three dragons) invalid hand without dragon pair", function(){
    expect(shouSangen.check(invalidHandWithoutDragonPair)).toBe(0);
});

var invalidHandWithoutTwoDragonPon = new Hand([
    new Pon(new DragonTile("red")),
    new Pon(new WindTile("north")),
    new Pair(new DragonTile("white")),
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2))
], []);
test("shou sangen (little three dragons) invalid hand without two dragon pon", function(){
    expect(shouSangen.check(invalidHandWithoutTwoDragonPon)).toBe(0);
});
