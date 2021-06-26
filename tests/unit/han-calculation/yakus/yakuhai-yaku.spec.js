import YakuhaiYaku from '@/core/han-calculation/yakus/yakuhai-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Quad, Sequence } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile } from '@/core/tile-classes'

const sut = new YakuhaiYaku()

test('chun yakuhai (red dragon triplet) valid hand', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DragonTile('red')),
      new Triplet(new BambooTile(7)),
      new Triplet(new BambooTile(4)),
      new Triplet(new DotTile(3)),
      new Pair(new DotTile(7))
    ]
  })

  expect(sut.check(hand)).toStrictEqual([{ key: 'chun', hanValue: 1, yakumanValue: 0 }])
})

test('hatsu yakuhai (green dragon triplet) valid hand', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DragonTile('green')),
      new Triplet(new BambooTile(7)),
      new Triplet(new BambooTile(4)),
      new Triplet(new DotTile(3)),
      new Pair(new DotTile(7))
    ]
  })

  expect(sut.check(hand)).toStrictEqual([{ key: 'hatsu', hanValue: 1, yakumanValue: 0 }])
})

test('haku yakuhai (white dragon triplet) valid hand', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DragonTile('white')),
      new Triplet(new BambooTile(7)),
      new Triplet(new BambooTile(4)),
      new Triplet(new DotTile(3)),
      new Pair(new DotTile(7))
    ]
  })

  expect(sut.check(hand)).toStrictEqual([{ key: 'haku', hanValue: 1, yakumanValue: 0 }])
})

describe('given the hand contains a triplet of east', () => {
  const combinaisons = [
    new Triplet(new WindTile('east')),
    new Triplet(new BambooTile(7)),
    new Triplet(new BambooTile(4)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]

  test('should return 2 han if the round and the seat wind are east', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'east', seatWind: 'east' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'ton', hanValue: 2, yakumanValue: 0 }])
  })

  test('should return 1 han if only the round wind is east', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'east', seatWind: 'south' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'ton', hanValue: 1, yakumanValue: 0 }])
  })

  test('should return 1 han if only the seat wind is east', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'south', seatWind: 'east' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'ton', hanValue: 1, yakumanValue: 0 }])
  })

  test('should not return any han if both the round and seat wind are not east', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'south', seatWind: 'south' })
    expect(sut.check(hand)).toBeUndefined()
  })
})

describe('given the hand contains a triplet of south', () => {
  const combinaisons = [
    new Triplet(new WindTile('south')),
    new Triplet(new BambooTile(7)),
    new Triplet(new BambooTile(4)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]

  test('should return 2 han if the round and the seat wind are south', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'south', seatWind: 'south' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'nan', hanValue: 2, yakumanValue: 0 }])
  })

  test('should return 1 han if only the round wind is south', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'south', seatWind: 'east' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'nan', hanValue: 1, yakumanValue: 0 }])
  })

  test('should return 1 han if only the seat wind is south', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'east', seatWind: 'south' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'nan', hanValue: 1, yakumanValue: 0 }])
  })

  test('should not return any han if both the round and seat wind are not south', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'east', seatWind: 'east' })
    expect(sut.check(hand)).toBeUndefined()
  })
})

describe('given the hand contains a triplet of west', () => {
  const combinaisons = [
    new Triplet(new WindTile('west')),
    new Triplet(new BambooTile(7)),
    new Triplet(new BambooTile(4)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]

  test('should return 2 han if the round and the seat wind are west', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'west', seatWind: 'west' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'xia', hanValue: 2, yakumanValue: 0 }])
  })

  test('should return 1 han if only the round wind is west', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'west', seatWind: 'east' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'xia', hanValue: 1, yakumanValue: 0 }])
  })

  test('should return 1 han if only the seat wind is west', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'east', seatWind: 'west' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'xia', hanValue: 1, yakumanValue: 0 }])
  })

  test('should not return any han if both the round and seat wind are not west', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'east', seatWind: 'east' })
    expect(sut.check(hand)).toBeUndefined()
  })
})

describe('given the hand contains a triplet of north', () => {
  const combinaisons = [
    new Triplet(new WindTile('north')),
    new Triplet(new BambooTile(7)),
    new Triplet(new BambooTile(4)),
    new Triplet(new DotTile(3)),
    new Pair(new DotTile(7))
  ]

  test('should return 2 han if the round and the seat wind are north', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'north', seatWind: 'north' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'pei', hanValue: 2, yakumanValue: 0 }])
  })

  test('should return 1 han if only the round wind is north', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'north', seatWind: 'east' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'pei', hanValue: 1, yakumanValue: 0 }])
  })

  test('should return 1 han if only the seat wind is north', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'east', seatWind: 'north' })
    expect(sut.check(hand)).toStrictEqual([{ key: 'pei', hanValue: 1, yakumanValue: 0 }])
  })

  test('should not return any han if both the round and seat wind are not north', () => {
    const hand = new Hand({ concealedCombinaisons: combinaisons, roundWind: 'east', seatWind: 'east' })
    expect(sut.check(hand)).toBeUndefined()
  })
})

test('can return multiple yakuhai', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new DragonTile('red')),
      new Triplet(new DragonTile('white')),
      new Triplet(new WindTile('south')),
      new Sequence(new DotTile(5)),
      new Pair(new DotTile(8))
    ],
    roundWind: 'south',
    seatWind: 'east'
  })

  const result = sut.check(hand)

  expect(result.length).toBe(3)
  expect(result.filter(x => x.key === 'chun')).toStrictEqual([{ key: 'chun', hanValue: 1, yakumanValue: 0 }])
  expect(result.filter(x => x.key === 'haku')).toStrictEqual([{ key: 'haku', hanValue: 1, yakumanValue: 0 }])
  expect(result.filter(x => x.key === 'nan')).toStrictEqual([{ key: 'nan', hanValue: 1, yakumanValue: 0 }])
})

test('quad should be valid for yakuhai', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Quad(new DragonTile('red')),
      new Triplet(new BambooTile(7)),
      new Triplet(new BambooTile(4)),
      new Triplet(new DotTile(3)),
      new Pair(new DotTile(7))
    ]
  })

  expect(sut.check(hand)).toStrictEqual([{ key: 'chun', hanValue: 1, yakumanValue: 0 }])
})

test('open combinaison should be valid for yakuhai', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Triplet(new BambooTile(7)),
      new Triplet(new BambooTile(4)),
      new Triplet(new DotTile(3)),
      new Pair(new DotTile(7))
    ],
    openCombinaisons: [
      new Triplet(new DragonTile('red'))
    ]
  })

  expect(sut.check(hand)).toStrictEqual([{ key: 'chun', hanValue: 1, yakumanValue: 0 }])
})
