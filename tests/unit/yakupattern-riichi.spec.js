import { Riichi } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var riichi = new Riichi();

var validHand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
], []);
validHand.isRiichi = true;
test("riichi valid hand", function(){
    expect(riichi.check(validHand)).toBe(1);
});

var invalidHand = new Hand([
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pon(new DotTile(4)),
    new Pair(new DotTile(5))
], []);
test("riichi valid hand", function(){
    expect(riichi.check(invalidHand)).toBe(0);
});
