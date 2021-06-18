import MenzenTsumoYaku from '@/core/han-calculation/yakus/menzen-tsumo-yaku'
import Hand from '@/core/hand'
import { Pon, Pair, Chii } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile } from '@/core/tile-classes'

const sut = new MenzenTsumoYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DragonTile('red')),
    new Pair(new DotTile(1))
  ],
  winningType: 'tsumo'
})

test('Menzen Tsumo (Fully Concealed Hand) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'menzen tsumo', hanValue: 1, yakumanValue: 0 })
})

const invalidHandWithRon = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pon(new DragonTile('red')),
    new Pair(new DotTile(1))
  ],
  winningType: 'ron'
})

test('Menzen Tsumo (Fully Concealed Hand) invalid hand win by ron', () => {
  expect(sut.check(invalidHandWithRon)).toBeUndefined()
})

const invalidHandNotConcealed = new Hand({
  concealedCombinaisons: [
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Chii(new BambooTile(7), new BambooTile(8), new BambooTile(9)),
    new Chii(new BambooTile(1), new BambooTile(2), new BambooTile(3)),
    new Pair(new DotTile(1))
  ],
  openCombinaisons: [
    new Pon(new DragonTile('red'))
  ],
  winningType: 'tsumo'
})

test('Menzen Tsumo (Fully Concealed Hand) invalid hand with open combinaison', () => {
  expect(sut.check(invalidHandNotConcealed)).toBeUndefined()
})
