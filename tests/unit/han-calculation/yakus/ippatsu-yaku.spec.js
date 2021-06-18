import IppatsuYaku from '@/core/han-calculation/yakus/ippatsu-yaku'
import Hand from '@/core/hand'

const sut = new IppatsuYaku()

describe('given the hand contains the ippatsu yaku', () => {
  const hand = new Hand({ yakus: ['ippatsu'] })

  test('should be eligible for ippatsu', () => {
    expect(sut.check(hand)).toStrictEqual({ key: 'ippatsu', hanValue: 1, yakumanValue: 0 })
  })
})

describe('given the hand does not contain the ippatsu yaku', () => {
  const hand = new Hand()

  test('should not be eligible for ippatsu', () => {
    expect(sut.check(hand)).toBeUndefined()
  })
})
