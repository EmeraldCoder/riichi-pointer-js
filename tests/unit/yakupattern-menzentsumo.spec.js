import { MenzenTsumo } from '@/core/yakupattern-classes'
import { Hand } from '@/core/hand-classes'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

var menzenTsumo = new MenzenTsumo();

var validHand = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DragonTile("red")),
    new Pair(new DotTile(1))
], [], 'east', 'east', 0, 0, 'tsumo');
test("Menzen Tsumo (Fully Concealed Hand) valid hand", function(){
    expect(menzenTsumo.check(validHand)).toBe(1);
});

var invalidHandWithRon = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DragonTile("red")),
    new Pair(new DotTile(1))
], [], 'east', 'east', 0, 0, 'ron');
test("Menzen Tsumo (Fully Concealed Hand) invalid hand win by ron", function(){
    expect(menzenTsumo.check(invalidHandWithRon)).toBe(0);
});

var invalidHandNotConcealed = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pair(new DotTile(1))
], [
    new Pon(new DragonTile("red"))
], 'east', 'east', 0, 0, 'tsumo');
test("Menzen Tsumo (Fully Concealed Hand) invalid hand with open combinaison", function(){
    expect(menzenTsumo.check(invalidHandNotConcealed)).toBe(0);
});
