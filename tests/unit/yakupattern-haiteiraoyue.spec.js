import { HaiteiRaoyue } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

var haiteiRaoyue = new HaiteiRaoyue();

test("haitei raoyue (Last Tile Draw) valid hand", function(){
    var hand = new Hand([
        new Pon(new DotTile(1)),
        new Pon(new DotTile(2)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pair(new DotTile(5))
    ], [], 'east', 'east', 0, 0, 'tsumo', 'haitei raoyue');
    expect(haiteiRaoyue.check(hand)).toBe(1);
});

test("haitei raoyue (Last Tile Draw) invalid hand", function(){
    var hand = new Hand([
        new Pon(new DotTile(1)),
        new Pon(new DotTile(2)),
        new Pon(new DotTile(3)),
        new Pon(new DotTile(4)),
        new Pair(new DotTile(5))
    ], [], 'east', 'east', 0, 0, 'tsumo');
    expect(haiteiRaoyue.check(hand)).toBe(0);
});
