import { RyanPeikou } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile } from '@/core/tile-classes'

var ryanPeikou = new RyanPeikou();

var validHand = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Pair(new DotTile(1))
], []);
test("ryan peikou (twice pure double chiis) valid hand", function(){
    expect(ryanPeikou.check(validHand)).toBe(3);
});

var validOpenHand = new Hand([
    new Pair(new DotTile(1)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3))
], [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9))
]);
test("ryan peikou (twice pure double chiis) valid open hand give 2 han", function(){
    expect(ryanPeikou.check(validOpenHand)).toBe(2);
});

var invalidHandWitoutTwoPairOfChii = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new DotTile(7), new DotTile(8), new DotTile(9)),
    new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new DotTile(1))
], []);
test("ryan peikou (twice pure double chiis) invalid hand without two pair of chii", function(){
    expect(ryanPeikou.check(invalidHandWitoutTwoPairOfChii)).toBe(0);
});

var invalidHandWithoutChii = new Hand([
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(2)),
    new Pon(new DotTile(7)),
    new Pon(new DotTile(1)),
    new Pair(new DotTile(1))
], []);
test("ryan peikou (twice pure double chiis) invalid hand without chii", function(){
    expect(ryanPeikou.check(invalidHandWithoutChii)).toBe(0);
});
