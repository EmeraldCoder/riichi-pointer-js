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
