import { Pair, Pon, Kan, Chii } from '@/core/combinaison-classes'
import { WindTile, DragonTile, DotTile, BambooTile, CharacterTile } from '@/core/tile-classes'
import { Hand } from '@/core/hand-classes'

// hand test
var concealedHandCombinaisons = [
    new Pon(new DragonTile('white')),
    new Pon(new DotTile(6)),
    new Kan(new CharacterTile(9)),
    new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new WindTile('east'))
];
var openHandCombinaisons = [];
var hand = new Hand(concealedHandCombinaisons, openHandCombinaisons, 'east', 'north');
test('hand has five concealed hand combinaison', function() {
    expect(hand.concealedCombinaisons.length).toBe(5);
});
test('hand has zero open hand combinaison', function() {
    expect(hand.openCombinaisons.length).toBe(0);
});
test('hand has five hand combinaison', function() {
    expect(hand.combinaisons.length).toBe(5);
});
test('hand has valid combinaison', function() {
    expect(hand.concealedCombinaisons).toBe(concealedHandCombinaisons);
    expect(hand.openCombinaisons).toBe(openHandCombinaisons);
    expect(hand.seatWind).toBe('east');
    expect(hand.roundWind).toBe('north');
});

// hand isFinish() test
var notFinishHandWhenEmpty = new Hand([], []);
test('hand is not finish when empty', function() {
    expect(notFinishHandWhenEmpty.isFinish()).toBeFalsy();
});

var notFinishHandWhenNotEnoughCombinaison = new Hand([
    new Pon(new DragonTile('red')),
    new Pon(new DragonTile('white')),
    new Pon(new DragonTile('green')),
    new Pair(new WindTile('east'))
], []);
test('hand is not finish when less than 4 combinaison', function(){
    expect(notFinishHandWhenNotEnoughCombinaison.isFinish()).toBeFalsy();
});

var notFinishHandWhenNoPair = new Hand([
    new Pon(new DragonTile('red')),
    new Pon(new DragonTile('white')),
    new Pon(new DragonTile('green')),
    new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pon(new WindTile('east'))
], []);
test('hand is not finish without a pair', function(){
    expect(notFinishHandWhenNoPair.isFinish()).toBeFalsy();
});

var finishHandWith4CombinaisonAnd1Pair = new Hand([
    new Pon(new DragonTile('red')),
    new Pon(new DragonTile('white')),
    new Pon(new DragonTile('green')),
    new Chii(new DotTile(1), new DotTile(2), new DotTile(3)),
    new Pair(new WindTile('east'))
], []);
test('hand is finish with 4 combinaison and 1 pair', function(){
    expect(finishHandWith4CombinaisonAnd1Pair.isFinish()).toBeTruthy();
});

var finishHandWithSevenPairs = new Hand([
    new Pair(new DragonTile('red')),
    new Pair(new DragonTile('white')),
    new Pair(new DragonTile('green')),
    new Pair(new WindTile('east')),
    new Pair(new WindTile('west')),
    new Pair(new WindTile('north')),
    new Pair(new WindTile('south'))
], []);
test('hand is finish with 7 pairs', function(){
    expect(finishHandWithSevenPairs.isFinish()).toBeTruthy();
});

// wait test
var validTwoSidedWait = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(9))
], [], 'east', 'east', 0, 0);
var validEdgeWait = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(9))
], [], 'east', 'east', 0, 2);
var validClosedWait = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(9))
], [], 'east', 'east', 0, 1);
var validSingleWait = new Hand([
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DotTile(1)),
    new Pon(new DotTile(2)),
    new Pon(new DotTile(3)),
    new Pair(new DotTile(9))
], [], 'east', 'east', 4, 0);
test('hand is a two-sided wait', function(){
    expect(validTwoSidedWait.isSingleWait()).toBeFalsy();
    expect(validTwoSidedWait.isClosedWait()).toBeFalsy();
    expect(validTwoSidedWait.isEdgeWait()).toBeFalsy();
    expect(validTwoSidedWait.isTwoSidedWait()).toBeTruthy();
});
test('hand is a edge wait', function(){
    expect(validEdgeWait.isSingleWait()).toBeFalsy();
    expect(validEdgeWait.isClosedWait()).toBeFalsy();
    expect(validEdgeWait.isEdgeWait()).toBeTruthy();
    expect(validEdgeWait.isTwoSidedWait()).toBeFalsy();
});
test('hand is a closed wait', function(){
    expect(validClosedWait.isSingleWait()).toBeFalsy();
    expect(validClosedWait.isClosedWait()).toBeTruthy();
    expect(validClosedWait.isEdgeWait()).toBeFalsy();
    expect(validClosedWait.isTwoSidedWait()).toBeFalsy();
});
test('hand is a single wait', function(){
    expect(validSingleWait.isSingleWait()).toBeTruthy();
    expect(validSingleWait.isClosedWait()).toBeFalsy();
    expect(validSingleWait.isEdgeWait()).toBeFalsy();
    expect(validSingleWait.isTwoSidedWait()).toBeFalsy();
});
