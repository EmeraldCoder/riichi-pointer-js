import { describe, expect, test } from 'vitest'
import TenhouYaku from '@/core/han-calculation/yakus/tenhou-yaku'
import Hand from '@/core/hand'

const sut = new TenhouYaku()

describe('given the hand contains the tenhou yaku', () => {
  const hand = new Hand({ yakus: ['tenhou'] })

  test('should be eligible for tenhou', () => {
    expect(sut.check(hand)).toStrictEqual({ key: 'tenhou', hanValue: 0, yakumanValue: 1 })
  })
})

describe('given the hand does not contain the tenhou yaku', () => {
  const hand = new Hand()

  test('should not be eligible for tenhou', () => {
    expect(sut.check(hand)).toBeUndefined()
  })
})
