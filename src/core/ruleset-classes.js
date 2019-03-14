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

export class Ruleset {
  getYakuPatterns () {
    throw new Error('NotImplemented')
  }
}

export class DefaultRuleset extends Ruleset {
  getYakuPatterns () {
    return [
      new TanyaouChuu(),
      new Honitsu(),
      new Chinitsu(),
      new Honroutou(),
      new Iipeikou(),
      new SanShokuDoujun(),
      new Itsu(),
      new Chanta(),
      new ChiiToitsu(),
      new SanShokuDokou(),
      new ToiToiHou(),
      new ShouSangen(),
      new RyanPeikou(),
      new JunchanTaiyai(),
      new FanpaiDragonPon(),
      new FanpaiRoundWind(),
      new FanpaiSeatWind(),
      new Pinfu(),
      new SanAnkou(),
      new SanKanTsu(),
      new MenzenTsumo(),
      new Riichi(),
      new DoubleRiichi(),
      new Ippatsu(),
      new HaiteiRaoyue(),
      new HouteiRaoyui(),
      new RinshanKaihou(),
      new ChanKan(),
      new Dora(),
      new UraDora()
    ]
  }
}