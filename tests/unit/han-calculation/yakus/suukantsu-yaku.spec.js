import SuukantsuYaku from '@/core/han-calculation/yakus/suukantsu-yaku'
import Hand from '@/core/hand'
import { Triplet, Pair, Sequence, Quad } from '@/core/combinaison-classes'
import { DotTile } from '@/core/tile-classes'

const sut = new SuukantsuYaku()

test('suukantsu (four kans) invalid hand because there is a triplet', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Quad(new DotTile(1)),
      new Quad(new DotTile(2)),
      new Quad(new DotTile(3)),
      new Triplet(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toBeUndefined()
})

test('suukantsu (four kans) invalid hand because there is a sequence', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Quad(new DotTile(1)),
      new Quad(new DotTile(2)),
      new Quad(new DotTile(3)),
      new Sequence(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toBeUndefined()
})

test('suukantsu (four kans) valid hand with four open/concealed kans', () => {
  const hand = new Hand({
    concealedCombinaisons: [
      new Pair(new DotTile(5)),
      new Quad(new DotTile(1)),
      new Quad(new DotTile(2)),
      new Quad(new DotTile(3))
    ],
    openCombinaisons: [
      new Quad(new DotTile(4))
    ]
  })

  expect(sut.check(hand)).toStrictEqual({ key: 'suukantsu', hanValue: 0, yakumanValue: 1 })
})
