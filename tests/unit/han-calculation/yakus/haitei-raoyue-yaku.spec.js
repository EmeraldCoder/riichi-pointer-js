import HaiteiRaoyueYaku from '@/core/han-calculation/yakus/haitei-raoyue-yaku'
import Hand from '@/core/hand'

const sut = new HaiteiRaoyueYaku()

describe('given the hand contains the haitei raoyue yaku', () => {
  const hand = new Hand({ yakus: ['haitei raoyue'] })

  test('should be eligible for haitei raoyue', () => {
    expect(sut.check(hand)).toStrictEqual({ key: 'haitei raoyue', hanValue: 1, yakumanValue: 0 })
  })
})

describe('given the hand does not contain the haitei raoyue yaku', () => {
  const hand = new Hand()

  test('should not be eligible for haitei raoyue', () => {
    expect(sut.check(hand)).toBeUndefined()
  })
})
