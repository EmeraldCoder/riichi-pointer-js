import WrcPointCalculator from '@/core/wrc/wrc-point-calculator'
import Hand from '@/core/hand'

const sut = new WrcPointCalculator()

test('kazoe yakuman should count as sanbaiman', () => {
  const hand = new Hand({ seatWind: 'east', winningType: 'tsumo' })
  const result = sut.calculate(hand, null, 13)
  expect(result).toStrictEqual({ nonDealer: 12000 })
})
