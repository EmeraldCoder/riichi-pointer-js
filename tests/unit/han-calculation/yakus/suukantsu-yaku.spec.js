import SuukantsuYaku from '@/core/han-calculation/yakus/suukantsu-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii, Kan } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

const sut = new SuukantsuYaku()

test('suukantsu (four kans) invalid hand because there is a pon', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Kan(new DotTile(1)),
      new Kan(new DotTile(2)),
      new Kan(new DotTile(3)),
      new Pon(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toBeUndefined()
})

test('suukantsu (four kans) invalid hand because there is a chii', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Kan(new DotTile(1)),
      new Kan(new DotTile(2)),
      new Kan(new DotTile(3)),
      new Chii(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toBeUndefined()
})

test('suukantsu (four kans) valid hand with four open/concealed kans', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Kan(new DotTile(1)),
      new Kan(new DotTile(2)),
      new Kan(new DotTile(3))
    ],
    openCombinaisons: [
      new Kan(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suukantsu', hanValue: 0, yakumanValue: 1 })
})
