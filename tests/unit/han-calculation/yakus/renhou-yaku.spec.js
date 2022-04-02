import { describe, expect, test } from 'vitest'
import RenhouYaku from '@/core/han-calculation/yakus/renhou-yaku'
import Hand from '@/core/hand'

describe('given the hand contains the renhou yaku', () => {
  const hand = new Hand({ yakus: ['renhou'] })

  test('should be worth 5 han by default', () => {
    expect(new RenhouYaku().check(hand)).toStrictEqual({ key: 'renhou', hanValue: 5, yakumanValue: 0 })
  })

  test('shoud be worth the amount of han configured with the yaku options', () => {
    expect(new RenhouYaku({ hanValue: 4, yakumanValue: 0 }).check(hand)).toStrictEqual({ key: 'renhou', hanValue: 4, yakumanValue: 0 })
  })

  test('shoud be worth the amount of yakuman configured with the yaku options', () => {
    expect(new RenhouYaku({ hanValue: 0, yakumanValue: 1 }).check(hand)).toStrictEqual({ key: 'renhou', hanValue: 0, yakumanValue: 1 })
  })
})

describe('given the hand does not contain the renhou yaku', () => {
  const hand = new Hand()

  test('should not be eligible for renhou', () => {
    expect(new RenhouYaku().check(hand)).toBeUndefined()
  })
})
