import { JunchanTaiyai } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile } from '@/core/tile-classes'

var junchanTaiyai = new JunchanTaiyai();

var validHand = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new BambooTile(9)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(9)),
    new Pair(new CharacterTile(1))
], []);
test("junchan taiyai (terminals in all sets) valid hand", function(){
    expect(junchanTaiyai.check(validHand)).toBe(3);
});

var invalidHandWithoutChii = new Hand([
    new Pon(new BambooTile(1)),
    new Pon(new BambooTile(9)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(9)),
    new Pair(new CharacterTile(1))
], []);
test("junchan taiyai (terminals in all sets) invalid hand without chii", function(){
    expect(junchanTaiyai.check(invalidHandWithoutChii)).toBe(0);
});

var invalidHandWithSetWithoutTerminal = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new BambooTile(8)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(9)),
    new Pair(new CharacterTile(1))
], []);
test("junchan taiyai (terminals in all sets) with set without terminal", function(){
    expect(junchanTaiyai.check(invalidHandWithSetWithoutTerminal)).toBe(0);
});
