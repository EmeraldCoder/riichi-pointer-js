import { TileFactory } from '@/core/tile-classes'
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
  Renhou
} from '@/core/yakupattern-classes'
import {
  Chiihou,
  ChinRoutou,
  ChuurenPoutou,
  DaiSangen,
  DaiSuushii,
  KokushiMusou,
  RyuuIisou,
  ShouSuushii,
  SuuAnkou,
  SuuKantsu,
  Tenhou,
  TsuuIisou
} from '@/core/yakumanpattern-classes'
import WrcFuCalculator from './wrc/wrc-fu-calculator'

export class Ruleset {
  getYakuPatterns () {
    throw new Error('NotImplemented')
  }

  getYakumanPatterns () {
    throw new Error('NotImplemented')
  }

  getAvailableTiles () {
    throw new Error('NotImplemented')
  }

  getFuCalculator () {
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
      new Renhou()
    ]
  }

  getYakumanPatterns () {
    return [
      new Chiihou(),
      new ChinRoutou(),
      new ChuurenPoutou(),
      new DaiSangen(),
      new DaiSuushii(),
      new KokushiMusou(),
      new ShouSuushii(),
      new SuuAnkou(),
      new SuuKantsu(),
      new RyuuIisou(),
      new Tenhou(),
      new TsuuIisou()
    ]
  }

  getAvailableTiles () {
    return [
      TileFactory.create('dragon', 'green'),
      TileFactory.create('dragon', 'red'),
      TileFactory.create('dragon', 'white'),

      TileFactory.create('wind', 'east'),
      TileFactory.create('wind', 'south'),
      TileFactory.create('wind', 'west'),
      TileFactory.create('wind', 'north'),

      TileFactory.create('bamboo', 1),
      TileFactory.create('bamboo', 2),
      TileFactory.create('bamboo', 3),
      TileFactory.create('bamboo', 4),
      TileFactory.create('bamboo', 5),
      TileFactory.create('bamboo', 6),
      TileFactory.create('bamboo', 7),
      TileFactory.create('bamboo', 8),
      TileFactory.create('bamboo', 9),

      TileFactory.create('character', 1),
      TileFactory.create('character', 2),
      TileFactory.create('character', 3),
      TileFactory.create('character', 4),
      TileFactory.create('character', 5),
      TileFactory.create('character', 6),
      TileFactory.create('character', 7),
      TileFactory.create('character', 8),
      TileFactory.create('character', 9),

      TileFactory.create('dot', 1),
      TileFactory.create('dot', 2),
      TileFactory.create('dot', 3),
      TileFactory.create('dot', 4),
      TileFactory.create('dot', 5),
      TileFactory.create('dot', 6),
      TileFactory.create('dot', 7),
      TileFactory.create('dot', 8),
      TileFactory.create('dot', 9)
    ]
  }

  getFuCalculator () {
    return new WrcFuCalculator()
  }
}
