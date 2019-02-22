import { SanShokuDokou } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

var sanShokuDokou = new SanShokuDokou();

var validHand = new Hand([
    new Pon(new BambooTile(1)),
    new Pon(new DotTile(1)),
    new Pon(new CharacterTile(1)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
], []);
test("san shoku dokou (triple pon) valid hand", function(){
    expect(sanShokuDokou.check(validHand)).toBe(2);
});

var invalidHandWithoutThreeSamePon = new Hand([
    new Pon(new BambooTile(1)),
    new Pon(new DotTile(1)),
    new Pon(new CharacterTile(2)),
    new Pon(new DotTile(3)),
    new Pair( new DotTile(7))
], []);
test("san shoku dokou (triple pon) invalid hand without three same pon", function() {
    expect(sanShokuDokou.check(invalidHandWithoutThreeSamePon)).toBe(0);
});
