import HonroutouYaku from '@/core/han-calculation/yakus/honroutou-yaku'
import Hand from '@/core/hand'
import { Pon, Pair } from '@/core/combinaison-classes'
import { DotTile, BambooTile, DragonTile, WindTile } from '@/core/tile-classes'

const sut = new HonroutouYaku()

const validHand = new Hand({
  concealedCombinaisons: [
    new Pon(new DragonTile('green')),
    new Pon(new DragonTile('white')),
    new Pon(new WindTile('east')),
    new Pon(new DotTile(1)),
    new Pair(new BambooTile(9))
  ]
})

test('honroutou (all terminals & honors) valid hand', () => {
  expect(sut.check(validHand)).toStrictEqual({ key: 'honroutou', hanValue: 2, yakumanValue: 0 })
})

const invalidHandWithTileNotHonorOrTerminal = new Hand({
  concealedCombinaisons: [
    new Pon(new DragonTile('green')),
    new Pon(new DragonTile('white')),
    new Pon(new WindTile('east')),
    new Pon(new DotTile(1)),
    new Pair(new BambooTile(5))
  ]
})

test('honroutou (all terminals & honors) invvalid hand with tiles not honor or terminal', () => {
  expect(sut.check(invalidHandWithTileNotHonorOrTerminal)).toBeUndefined()
})
