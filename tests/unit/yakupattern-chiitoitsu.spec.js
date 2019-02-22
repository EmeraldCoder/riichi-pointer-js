import { ChiiToitsu } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { BambooTile } from '@/core/tile-classes'

var chiiToitsu = new ChiiToitsu();

var validHand = new Hand([
    new Pair(new BambooTile(1)),
    new Pair(new BambooTile(2)),
    new Pair(new BambooTile(3)),
    new Pair(new BambooTile(4)),
    new Pair(new BambooTile(5)),
    new Pair(new BambooTile(6)),
    new Pair(new BambooTile(7))
], []);
test("chii toitsu (seven pairs) valid hand", function(){
    expect(chiiToitsu.check(validHand)).toBe(2);
});

var invalidHandWithoutSevenPairs = new Hand([
    new Pair(new BambooTile(1)),
    new Pair(new BambooTile(2)),
    new Pair(new BambooTile(3)),
    new Pair(new BambooTile(4)),
    new Pair(new BambooTile(5)),
    new Pair(new BambooTile(6)),
    new Pon(new BambooTile(7))
], []);
test("chii toitsu (seven pairs) invalid hand without seven pairs", function(){
    expect(chiiToitsu.check(invalidHandWithoutSevenPairs)).toBe(0);
});
