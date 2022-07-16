import { expect, test } from 'vitest'
import WrcPointCalculator from '@/core/wrc/wrc-point-calculator'
import Hand from '@/core/hand'

const sut = new WrcPointCalculator()

test('kazoe yakuman should count as sanbaiman', () => {
  const hand = new Hand({ seatWind: 'east', winningType: 'tsumo' })
  const result = sut.calculate(hand, null, 13)
  expect(result).toStrictEqual({ nonDealer: 12000 })
})

test('kiriage mangan should be active', () => {
  const hand = new Hand({ seatWind: 'east', winningType: 'ron' })
  const result = sut.calculate(hand, 30, 4)
  expect(result).toStrictEqual({ discard: 12000 })
})
