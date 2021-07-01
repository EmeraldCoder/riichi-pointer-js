import WrcHanCalculator from '@/core/wrc/wrc-han-calculator'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence, Quad } from '@/core/combinaison-classes'
import { DotTile, CharacterTile, BambooTile, WindTile, DragonTile } from '@/core/tile-classes'

const wrcCalculator = new WrcHanCalculator()

test('open tanyao should be valid', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DotTile(2)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new CharacterTile(5))
    ],
    openCombinaisons: [
      new Triplet(new BambooTile(2)),
      new Quad(new CharacterTile(8))
    ]
  })

  const result = wrcCalculator.calculate(hand)

  expect(result.han).toBe(1)
  expect(result.yakuman).toBeNull()
})

test('open ryanpeikou should not be valid', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Pair(new CharacterTile(9))
    ],
    openCombinaisons: [
      new Sequence(new CharacterTile(4), new CharacterTile(5), new CharacterTile(6)),
      new Sequence(new CharacterTile(4), new CharacterTile(5), new CharacterTile(6))
    ]
  })

  const result = wrcCalculator.calculate(hand)

  expect(result.han).toBeNull()
  expect(result.yakuman).toBeNull()
})

test('renhou should be worth 5 han', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Triplet(new DotTile(8)),
      new Sequence(new CharacterTile(4), new CharacterTile(5), new CharacterTile(6)),
      new Triplet(new WindTile('north')),
      new Pair(new CharacterTile(9))
    ],
    winningType: 'ron',
    yakus: ['renhou'],
    seatWind: 'west'
  })

  hand.wonDuringFirstUninterruptedRound = true

  const result = wrcCalculator.calculate(hand)

  expect(result.han).toBe(5)
  expect(result.yakuman).toBeNull()
})

test('test case 1', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Sequence(new DotTile(2), new DotTile(3), new DotTile(4)),
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7)),
      new Sequence(new DotTile(5), new DotTile(6), new DotTile(7)),
      new Pair(new DotTile(8))
    ],
    winningType: 'tsumo',
    yakus: ['riichi', 'ippatsu', 'haitei raoyue'],
    roundWind: 'east',
    seatWind: 'east',
    winningCombinaisonIndex: 0,
    winningTileIndex: 0
  })

  const result = wrcCalculator.calculate(hand)

  expect(result.han).toBe(15)
  expect(result.yakuman).toBeNull()
  expect(result.details.length).toBe(8)
  expect(result.details.filter(x => x.key === 'chinitsu')).toStrictEqual([{ key: 'chinitsu', hanValue: 6, yakumanValue: 0 }])
  expect(result.details.filter(x => x.key === 'ryanpeikou')).toStrictEqual([{ key: 'ryanpeikou', hanValue: 3, yakumanValue: 0 }])
  expect(result.details.filter(x => x.key === 'menzen tsumo')).toStrictEqual([{ key: 'menzen tsumo', hanValue: 1, yakumanValue: 0 }])
  expect(result.details.filter(x => x.key === 'pinfu')).toStrictEqual([{ key: 'pinfu', hanValue: 1, yakumanValue: 0 }])
  expect(result.details.filter(x => x.key === 'tanyao')).toStrictEqual([{ key: 'tanyao', hanValue: 1, yakumanValue: 0 }])
  expect(result.details.filter(x => x.key === 'riichi')).toStrictEqual([{ key: 'riichi', hanValue: 1, yakumanValue: 0 }])
  expect(result.details.filter(x => x.key === 'ippatsu')).toStrictEqual([{ key: 'ippatsu', hanValue: 1, yakumanValue: 0 }])
  expect(result.details.filter(x => x.key === 'haitei raoyue')).toStrictEqual([{ key: 'haitei raoyue', hanValue: 1, yakumanValue: 0 }])
})

test('test case 2', () => {
  // yakuman should be capped at 1 yakuman

  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DragonTile('red')),
      new Triplet(new DragonTile('green')),
      new Triplet(new DragonTile('white')),
      new Pair(new WindTile('north'))
    ],
    openCombinaisons: [
      new Triplet(new WindTile('east'))
    ],
    winningType: 'ron',
    roundWind: 'east',
    seatWind: 'east',
    winningCombinaisonIndex: 0,
    winningTileIndex: 0
  })

  const result = wrcCalculator.calculate(hand)

  expect(result.han).toBeNull()
  expect(result.yakuman).toBe(1)
  expect(result.details.length).toBe(2)
  expect(result.details.filter(x => x.key === 'daisangen')).toStrictEqual([{ key: 'daisangen', hanValue: 0, yakumanValue: 1 }])
  expect(result.details.filter(x => x.key === 'tsuuiisou')).toStrictEqual([{ key: 'tsuuiisou', hanValue: 0, yakumanValue: 1 }])
})
