import { Honroutou } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile } from '@/core/tile-classes'

var honroutou = new Honroutou();
var validHand = new Hand([
    new Pon(new DragonTile('green')),
    new Pon(new DragonTile('white')),
    new Pon(new WindTile('east')),
    new Pon(new DotTile(1)),
    new Pair(new BambooTile(9))
], []);
test("honroutou (all terminals & honors) valid hand", function(){
    expect(honroutou.check(validHand)).toBe(2);
});

var invalidHandWithTileNotHonorOrTerminal = new Hand([
    new Pon(new DragonTile('green')),
    new Pon(new DragonTile('white')),
    new Pon(new WindTile('east')),
    new Pon(new DotTile(1)),
    new Pair(new BambooTile(5))
], []);
test("honroutou (all terminals & honors) invvalid hand with tiles not honor or terminal", function(){
    expect(honroutou.check(invalidHandWithTileNotHonorOrTerminal)).toBe(0);
});
