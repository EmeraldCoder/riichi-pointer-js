import { DefaultRuleset } from '@/core/ruleset-classes'
import {
  TanyaouChuu,
  Honitsu,
  Chinitsu,
  Honroutou,
  Iipeikou,
  SanShokuDoujun,
  Itsu,
  Chanta,
  ChiiToitsu,
  SanShokuDokou,
  ToiToiHou,
  ShouSangen,
  RyanPeikou,
  JunchanTaiyai,
  FanpaiDragonPon,
  FanpaiRoundWind,
  FanpaiSeatWind,
  Pinfu,
  SanAnkou,
  SanKanTsu,
  MenzenTsumo,
  Riichi,
  DoubleRiichi,
  Ippatsu,
  HaiteiRaoyue,
  HouteiRaoyui,
  RinshanKaihou,
  ChanKan,
  Dora,
  UraDora
} from '@/core/yakupattern-classes'
import {
  ChinRoutou,
  ChuurenPoutou,
  DaiSangen,
  DaiSuushii,
  RyuuIisou,
  ShouSuushii,
  SuuAnkou,
  SuuKantsu,
  TsuuIisou
} from '@/core/yakumanpattern-classes'
import {
  DragonTile,
  WindTile,
  BambooTile,
  CharacterTile,
  DotTile
} from '@/core/tile-classes'

test('default ruleset return valid yaku pattern list', () => {
  const patterns = new DefaultRuleset().getYakuPatterns()

  expect(patterns.length).toBe(30)
  expect(patterns.filter(x => x instanceof TanyaouChuu).length).toBe(1)
  expect(patterns.filter(x => x instanceof Honitsu).length).toBe(1)
  expect(patterns.filter(x => x instanceof Chinitsu).length).toBe(1)
  expect(patterns.filter(x => x instanceof Honroutou).length).toBe(1)
  expect(patterns.filter(x => x instanceof Iipeikou).length).toBe(1)
  expect(patterns.filter(x => x instanceof SanShokuDoujun).length).toBe(1)
  expect(patterns.filter(x => x instanceof Itsu).length).toBe(1)
  expect(patterns.filter(x => x instanceof Chanta).length).toBe(1)
  expect(patterns.filter(x => x instanceof ChiiToitsu).length).toBe(1)
  expect(patterns.filter(x => x instanceof SanShokuDokou).length).toBe(1)
  expect(patterns.filter(x => x instanceof ToiToiHou).length).toBe(1)
  expect(patterns.filter(x => x instanceof ShouSangen).length).toBe(1)
  expect(patterns.filter(x => x instanceof RyanPeikou).length).toBe(1)
  expect(patterns.filter(x => x instanceof JunchanTaiyai).length).toBe(1)
  expect(patterns.filter(x => x instanceof FanpaiDragonPon).length).toBe(1)
  expect(patterns.filter(x => x instanceof FanpaiRoundWind).length).toBe(1)
  expect(patterns.filter(x => x instanceof FanpaiSeatWind).length).toBe(1)
  expect(patterns.filter(x => x instanceof Pinfu).length).toBe(1)
  expect(patterns.filter(x => x instanceof SanAnkou).length).toBe(1)
  expect(patterns.filter(x => x instanceof SanKanTsu).length).toBe(1)
  expect(patterns.filter(x => x instanceof MenzenTsumo).length).toBe(1)
  expect(patterns.filter(x => x instanceof Riichi).length).toBe(1)
  expect(patterns.filter(x => x instanceof DoubleRiichi).length).toBe(1)
  expect(patterns.filter(x => x instanceof Ippatsu).length).toBe(1)
  expect(patterns.filter(x => x instanceof HaiteiRaoyue).length).toBe(1)
  expect(patterns.filter(x => x instanceof HouteiRaoyui).length).toBe(1)
  expect(patterns.filter(x => x instanceof RinshanKaihou).length).toBe(1)
  expect(patterns.filter(x => x instanceof ChanKan).length).toBe(1)
  expect(patterns.filter(x => x instanceof Dora).length).toBe(1)
  expect(patterns.filter(x => x instanceof UraDora).length).toBe(1)
})

test('default ruleset return valid yakuman pattern list', () => {
  const patterns = new DefaultRuleset().getYakumanPatterns()

  expect(patterns.length).toBe(9)
  expect(patterns.filter(x => x instanceof SuuAnkou).length).toBe(1)
  expect(patterns.filter(x => x instanceof SuuKantsu).length).toBe(1)
  expect(patterns.filter(x => x instanceof RyuuIisou).length).toBe(1)
  expect(patterns.filter(x => x instanceof ChinRoutou).length).toBe(1)
  expect(patterns.filter(x => x instanceof TsuuIisou).length).toBe(1)
  expect(patterns.filter(x => x instanceof DaiSangen).length).toBe(1)
  expect(patterns.filter(x => x instanceof ShouSuushii).length).toBe(1)
  expect(patterns.filter(x => x instanceof DaiSuushii).length).toBe(1)
  expect(patterns.filter(x => x instanceof ChuurenPoutou).length).toBe(1)
})

test('default ruleset return valid available tile list', () => {
  const tiles = new DefaultRuleset().getAvailableTiles()

  expect(tiles.length).toBe(34)
  expect(tiles.filter(x => x instanceof DragonTile && x.color === 'green').length).toBe(1)
  expect(tiles.filter(x => x instanceof DragonTile && x.color === 'red').length).toBe(1)
  expect(tiles.filter(x => x instanceof DragonTile && x.color === 'white').length).toBe(1)
  expect(tiles.filter(x => x instanceof WindTile && x.direction === 'east').length).toBe(1)
  expect(tiles.filter(x => x instanceof WindTile && x.direction === 'south').length).toBe(1)
  expect(tiles.filter(x => x instanceof WindTile && x.direction === 'west').length).toBe(1)
  expect(tiles.filter(x => x instanceof WindTile && x.direction === 'north').length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 1).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 2).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 3).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 4).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 5).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 6).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 7).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 8).length).toBe(1)
  expect(tiles.filter(x => x instanceof BambooTile && x.number === 9).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 1).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 2).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 3).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 4).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 5).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 6).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 7).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 8).length).toBe(1)
  expect(tiles.filter(x => x instanceof CharacterTile && x.number === 9).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 1).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 2).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 3).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 4).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 5).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 6).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 7).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 8).length).toBe(1)
  expect(tiles.filter(x => x instanceof DotTile && x.number === 9).length).toBe(1)
})
