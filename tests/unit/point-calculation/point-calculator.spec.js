import PointCalculator from '@/core/point-calculation/point-calculator'
import Hand from '@/core/hand'

import dealerScoreFixture from './../../fixtures/dealer-score-fixture.json'
import nonDealerScoreFixture from './../../fixtures/non-dealer-score-fixture.json'

describe('given the hand was won by tsumo by the dealer', () => {
  const sut = new PointCalculator()
  const hand = new Hand({ seatWind: 'east', winningType: 'tsumo' })

  test.each(dealerScoreFixture.filter(x => x[3] != null).map(x => [x[0], x[1], x[3]]))('%i han and %i fu should be worth %i point from all players', (han, fu, expected) => {
    const result = sut.calculate(hand, fu, han)
    expect(result).toStrictEqual({ nonDealer: expected })
  })
})

describe('given the hand was won by ron by the dealer', () => {
  const sut = new PointCalculator()
  const hand = new Hand({ seatWind: 'east', winningType: 'ron' })

  test.each(dealerScoreFixture.map(x => [x[0], x[1], x[2]]))('%i han and %i fu should be worth %i point from discard player', (han, fu, expected) => {
    const result = sut.calculate(hand, fu, han)
    expect(result).toStrictEqual({ discard: expected })
  })
})

describe('given the hand was won by tsumo by a non dealer', () => {
  const sut = new PointCalculator()
  const hand = new Hand({ seatWind: 'south', winningType: 'tsumo' })

  test.each(nonDealerScoreFixture.filter(x => x[3] != null && x[4] != null).map(x => [x[0], x[1], x[3], x[4]]))('%i han and %i fu should be worth %i point from the dealer and %i from the others', (han, fu, expectedFromDealer, expectedFromNonDealers) => {
    const result = sut.calculate(hand, fu, han)
    expect(result).toStrictEqual({ dealer: expectedFromDealer, nonDealer: expectedFromNonDealers })
  })
})

describe('given the hand was won by ron by a non dealer', () => {
  const sut = new PointCalculator()
  const hand = new Hand({ seatWind: 'south', winningType: 'ron' })

  test.each(nonDealerScoreFixture.map(x => [x[0], x[1], x[2]]))('%i han and %i fu should be worth %i point from discard player', (han, fu, expected) => {
    const result = sut.calculate(hand, fu, han)
    expect(result).toStrictEqual({ discard: expected })
  })
})

describe('given the hand is a yakuman', () => {
  const sut = new PointCalculator()

  test('dealer tsumo should be worth 16000 point from all player', () => {
    const hand = new Hand({ seatWind: 'east', winningType: 'tsumo' })
    const result = sut.calculate(hand, null, null, 1)
    expect(result).toStrictEqual({ nonDealer: 16000 })
  })

  test('dealer ron should be worth 48000 point from discard player', () => {
    const hand = new Hand({ seatWind: 'east', winningType: 'ron' })
    const result = sut.calculate(hand, null, null, 1)
    expect(result).toStrictEqual({ discard: 48000 })
  })

  test('non dealer tsumo should be worth 16000 point from the dealer and 8000 from the others', () => {
    const hand = new Hand({ seatWind: 'south', winningType: 'tsumo' })
    const result = sut.calculate(hand, null, null, 1)
    expect(result).toStrictEqual({ dealer: 16000, nonDealer: 8000 })
  })

  test('non dealer ron should be worth 32000 point from discard player', () => {
    const hand = new Hand({ seatWind: 'south', winningType: 'ron' })
    const result = sut.calculate(hand, null, null, 1)
    expect(result).toStrictEqual({ discard: 32000 })
  })
})

describe('given the calculator is configured to count kazoe yakuman as sanbaiman', () => {
  const sut = new PointCalculator({ kazoeYakumanAsSanbaiman: true })

  test('dealer tsumo with kazoe yakuman should be worth 12000 point from all players', () => {
    const hand = new Hand({ seatWind: 'east', winningType: 'tsumo' })
    const result = sut.calculate(hand, null, 13)
    expect(result).toStrictEqual({ nonDealer: 12000 })
  })

  test('dealer ron with kazoe yakuman should be worth 36000 point from discard player', () => {
    const hand = new Hand({ seatWind: 'east', winningType: 'ron' })
    const result = sut.calculate(hand, null, 13)
    expect(result).toStrictEqual({ discard: 36000 })
  })

  test('non dealer tsumo with kazoe yakuman should be worth 12000 point from the dealer and 6000 from the others', () => {
    const hand = new Hand({ seatWind: 'south', winningType: 'tsumo' })
    const result = sut.calculate(hand, null, 13)
    expect(result).toStrictEqual({ dealer: 12000, nonDealer: 6000 })
  })

  test('non dealer ron with kazoe yakuman should be worth 24000 point from discard player', () => {
    const hand = new Hand({ seatWind: 'south', winningType: 'ron' })
    const result = sut.calculate(hand, null, 13)
    expect(result).toStrictEqual({ discard: 24000 })
  })
})

describe('given the calculator is configured to count kazoe yakuman as yakuman', () => {
  const sut = new PointCalculator({ kazoeYakumanAsSanbaiman: false })

  test('dealer tsumo with kazoe yakuman should be worth 16000 point from all players', () => {
    const hand = new Hand({ seatWind: 'east', winningType: 'tsumo' })
    const result = sut.calculate(hand, null, 13)
    expect(result).toStrictEqual({ nonDealer: 16000 })
  })

  test('dealer ron with kazoe yakuman should be worth 48000 point from discard player', () => {
    const hand = new Hand({ seatWind: 'east', winningType: 'ron' })
    const result = sut.calculate(hand, null, 13)
    expect(result).toStrictEqual({ discard: 48000 })
  })

  test('non dealer tsumo with kazoe yakuman should be worth 16000 point from the dealer and 8000 from the others', () => {
    const hand = new Hand({ seatWind: 'south', winningType: 'tsumo' })
    const result = sut.calculate(hand, null, 13)
    expect(result).toStrictEqual({ dealer: 16000, nonDealer: 8000 })
  })

  test('non dealer ron with kazoe yakuman should be worth 32000 point from discard player', () => {
    const hand = new Hand({ seatWind: 'south', winningType: 'ron' })
    const result = sut.calculate(hand, null, 13)
    expect(result).toStrictEqual({ discard: 32000 })
  })
})

describe('given the calculator is configured to not stack multiple yakuman', () => {
  test('hand with yakuman value higher than 1 should be capped at 1 yakuman', () => {
    const sut = new PointCalculator({ stackableYakuman: false })
    const hand = new Hand({ seatWind: 'east', winningType: 'ron' })
    const result = sut.calculate(hand, null, null, 3)
    expect(result).toStrictEqual({ discard: 48000 })
  })
})

describe('given the calculator is configured to stack multiple yakuman', () => {
  test('hand with yakuman value higher than 1 should be multiply by the number of yakuman', () => {
    const sut = new PointCalculator({ stackableYakuman: true })
    const hand = new Hand({ seatWind: 'east', winningType: 'ron' })
    const result = sut.calculate(hand, null, null, 2)
    expect(result).toStrictEqual({ discard: 96000 })
  })
})
