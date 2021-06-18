import RiichiYaku from '@/core/han-calculation/yakus/riichi-yaku'
import Hand from '@/core/hand'

const sut = new RiichiYaku()

describe('given the hand contains the riichi yaku', () => {
  const hand = new Hand({ yakus: ['riichi'] })

  test('should be eligible for riichi', () => {
    expect(sut.check(hand)).toStrictEqual({ key: 'riichi', hanValue: 1, yakumanValue: 0 })
  })
})

describe('given the hand does not contain the riichi yaku', () => {
  const hand = new Hand()

  test('should not be eligible for riichi', () => {
    expect(sut.check(hand)).toBeUndefined()
  })
})
