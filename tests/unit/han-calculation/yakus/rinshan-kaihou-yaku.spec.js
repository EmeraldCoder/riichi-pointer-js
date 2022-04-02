import { describe, expect, test } from 'vitest'
import RinshanKaihouYaku from '@/core/han-calculation/yakus/rinshan-kaihou-yaku'
import Hand from '@/core/hand'

const sut = new RinshanKaihouYaku()

describe('given the hand contains the rinshan kaihou yaku', () => {
  const hand = new Hand({ yakus: ['rinshan kaihou'] })

  test('should be eligible for rinshan kaihou', () => {
    expect(sut.check(hand)).toStrictEqual({ key: 'rinshan kaihou', hanValue: 1, yakumanValue: 0 })
  })
})

describe('given the hand does not contain the rinshan kaihou yaku', () => {
  const hand = new Hand()

  test('should not be eligible for rinshan kaihou', () => {
    expect(sut.check(hand)).toBeUndefined()
  })
})
