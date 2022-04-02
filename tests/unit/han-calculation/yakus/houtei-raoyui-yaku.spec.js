import { describe, expect, test } from 'vitest'
import HouteiRaoyuiYaku from '@/core/han-calculation/yakus/houtei-raoyui-yaku'
import Hand from '@/core/hand'

const sut = new HouteiRaoyuiYaku()

describe('given the hand contains the houtei raoyui yaku', () => {
  const hand = new Hand({ yakus: ['houtei raoyui'] })

  test('should be eligible for houtei raoyui', () => {
    expect(sut.check(hand)).toStrictEqual({ key: 'houtei raoyui', hanValue: 1, yakumanValue: 0 })
  })
})

describe('given the hand does not contain the houtei raoyui yaku', () => {
  const hand = new Hand()

  test('should not be eligible for houtei raoyui', () => {
    expect(sut.check(hand)).toBeUndefined()
  })
})
