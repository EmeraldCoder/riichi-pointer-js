import { DoubleRiichi } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var doubleRiichi = new DoubleRiichi();

var validHand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
], []);
validHand.isDoubleRiichi = true;
test("double riichi valid hand", function(){
    expect(doubleRiichi.check(validHand)).toBe(1);
});

var invalidHand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
], []);
test("double riichi valid hand", function(){
    expect(doubleRiichi.check(invalidHand)).toBe(0);
});
