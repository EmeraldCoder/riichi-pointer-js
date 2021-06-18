import ChiihouYaku from '@/core/han-calculation/yakus/chiihou-yaku'
import Hand from '@/core/hand'

describe('given the hand contains the chiihou yaku', () => {
  const hand = new Hand({ yakus: ['chiihou'] })

  test('should be eligible for chiihou', () => {
    expect(new ChiihouYaku().check(hand)).toStrictEqual({ key: 'chiihou', hanValue: 0, yakumanValue: 1 })
  })
})

describe('given the hand does not contain the chiihou yaku', () => {
  const hand = new Hand()

  test('should not be eligible for chiihou', () => {
    expect(new ChiihouYaku().check(hand)).toBeUndefined()
  })
})
