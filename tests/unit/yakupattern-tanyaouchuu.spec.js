import { TanyaouChuu } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile, DragonTile } from '@/core/tile-classes'

var tanyaouChuu = new TanyaouChuu();
var validHand = new Hand([
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
], []);
test("tanyaou chuu (all simples) valid hand", function(){
    expect(tanyaouChuu.check(validHand)).toBe(1);
});

var invalidHandWithHonorTile = new Hand([
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(6), new BambooTile(7), new BambooTile(8)),
    new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Pon(new DragonTile("red")),
    new Pair(new DotTile(7))
], []);
test("tanyaou chuu (all simples) invalid hand with honor tiles", function(){
    expect(tanyaouChuu.check(invalidHandWithHonorTile)).toBe(0);
});

var invalidHandWithTerminalTile = new Hand([
    new Chii(new BambooTile(2), new BambooTile(3), new BambooTile(4)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new CharacterTile(3), new CharacterTile(4), new CharacterTile(5)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(7))
], []);
test("tanyaou chuu (all simples) invalid hand with terminal tile", function(){
    expect(tanyaouChuu.check(invalidHandWithTerminalTile)).toBe(0);
});
