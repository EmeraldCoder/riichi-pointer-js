import DoubleRiichiYaku from '@/core/han-calculation/yakus/double-riichi-yaku'
import Hand from '@/core/hand'

const sut = new DoubleRiichiYaku()

describe('given the hand contains the double riichi yaku', () => {
  const hand = new Hand({ yakus: ['double riichi'] })

  test('should be eligible for double riichi', () => {
    expect(sut.check(hand)).toStrictEqual({ key: 'double riichi', hanValue: 1, yakumanValue: 0 })
  })
})

describe('given the hand does not contain the double riichi yaku', () => {
  const hand = new Hand()

  test('should not be eligible for double riichi', () => {
    expect(sut.check(hand)).toBeUndefined()
  })
})
