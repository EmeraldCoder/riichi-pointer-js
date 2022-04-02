import { describe, expect, test } from 'vitest'
import OpenRiichiYaku from '@/core/han-calculation/yakus/open-riichi-yaku'
import Hand from '@/core/hand'

describe('given the hand contains the riichi yaku', () => {
  test('should be worth 1 han with the hand is won by tsumo (self-draw)', () => {
    const hand = new Hand({ yakus: ['riichi', 'open riichi'], winningType: 'tsumo' })
    expect(new OpenRiichiYaku().check(hand)).toStrictEqual({ key: 'open riichi', hanValue: 1, yakumanValue: 0 })
  })

  test('should be worth 1 han if the hand was won by ron (discard) and the yaku option for ronAsYakuman is false (default)', () => {
    const hand = new Hand({ yakus: ['riichi', 'open riichi'], winningType: 'ron' })
    expect(new OpenRiichiYaku().check(hand)).toStrictEqual({ key: 'open riichi', hanValue: 1, yakumanValue: 0 })
  })

  test('should be worth 1 yakuman if the hand was won by ron (discard) and the yaku option for ronAsYakuman is true', () => {
    const hand = new Hand({ yakus: ['riichi', 'open riichi'], winningType: 'ron' })
    expect(new OpenRiichiYaku({ ronAsYakuman: true }).check(hand)).toStrictEqual({ key: 'open riichi', hanValue: 0, yakumanValue: 1 })
  })
})

describe('given the hand does not contain the open riichi yaku', () => {
  const hand = new Hand()

  test('should not be eligible for open riichi', () => {
    expect(new OpenRiichiYaku().check(hand)).toBeUndefined()
  })
})
