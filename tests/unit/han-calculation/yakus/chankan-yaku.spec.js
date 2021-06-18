import ChankanYaku from '@/core/han-calculation/yakus/chankan-yaku'
import Hand from '@/core/hand'

const sut = new ChankanYaku()

test('chankan (Robbing the kan) valid hand', () => {
  const hand = new Hand({ yakus: ['chankan'] })
  expect(sut.check(hand)).toStrictEqual({ key: 'chankan', hanValue: 1, yakumanValue: 0 })
})

test('chankan (Robbing the kan) invalid hand', () => {
  const hand = new Hand()
  expect(sut.check(hand)).toBeUndefined()
})
