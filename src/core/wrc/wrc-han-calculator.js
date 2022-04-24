import ChankanYaku from './../han-calculation/yakus/chankan-yaku'
import ChantaYaku from './../han-calculation/yakus/chanta-yaku'
import ChiihouYaku from './../han-calculation/yakus/chiihou-yaku'
import ChiitoitsuYaku from './../han-calculation/yakus/chiitoitsu-yaku'
import ChinitsuYaku from './../han-calculation/yakus/chinitsu-yaku'
import ChinroutouYaku from './../han-calculation/yakus/chinroutou-yaku'
import ChuurenPoutouYaku from './../han-calculation/yakus/chuuren-poutou-yaku'
import DaisangenYaku from './../han-calculation/yakus/daisangen-yaku'
import DaisuushiiYaku from './../han-calculation/yakus/daisuushii-yaku'
import DoubleRiichiYaku from './../han-calculation/yakus/double-riichi-yaku'
import HaiteiRaoyueYaku from './../han-calculation/yakus/haitei-raoyue-yaku'
import HonitsuYaku from './../han-calculation/yakus/honitsu-yaku'
import HonroutouYaku from './../han-calculation/yakus/honroutou-yaku'
import HouteiRaoyuiYaku from './../han-calculation/yakus/houtei-raoyui-yaku'
import IipeikouYaku from './../han-calculation/yakus/iipeikou-yaku'
import IppatsuYaku from './../han-calculation/yakus/ippatsu-yaku'
import IttsuuYaku from './../han-calculation/yakus/ittsuu-yaku'
import JunchanYaku from './../han-calculation/yakus/junchan-yaku'
import KokushiMusouYaku from './../han-calculation/yakus/kokushi-musou-yaku'
import MenzenTsumoYaku from './../han-calculation/yakus/menzen-tsumo-yaku'
import PinfuYaku from './../han-calculation/yakus/pinfu-yaku'
import RenhouYaku from './../han-calculation/yakus/renhou-yaku'
import RiichiYaku from './../han-calculation/yakus/riichi-yaku'
import RinshanKaihouYaku from './../han-calculation/yakus/rinshan-kaihou-yaku'
import RyanpeikouYaku from './../han-calculation/yakus/ryanpeikou-yaku'
import RyuuiisouYaku from './../han-calculation/yakus/ryuuiisou-yaku'
import SanankouYaku from './../han-calculation/yakus/sanankou-yaku'
import SankantsuYaku from './../han-calculation/yakus/sankantsu-yaku'
import SanshokuDoujunYaku from './../han-calculation/yakus/sanshoku-doujun-yaku'
import SanshokuDoukouYaku from './../han-calculation/yakus/sanshoku-doukou-yaku'
import ShousangenYaku from './../han-calculation/yakus/shousangen-yaku'
import ShousuushiiYaku from './../han-calculation/yakus/shousuushii-yaku'
import SuuankouYaku from './../han-calculation/yakus/suuankou-yaku'
import SuukantsuYaku from './../han-calculation/yakus/suukantsu-yaku'
import TanyaoYaku from './../han-calculation/yakus/tanyao-yaku'
import TenhouYaku from './../han-calculation/yakus/tenhou-yaku'
import ToitoiYaku from './../han-calculation/yakus/toitoi-yaku'
import TsuuiisouYaku from './../han-calculation/yakus/tsuuiisou-yaku'
import YakuhaiYaku from './../han-calculation/yakus/yakuhai-yaku'

import HanCalculator from './../han-calculation/han-calculator'

class WrcHanCalculator extends HanCalculator {
  constructor () {
    super([
      new ChankanYaku(),
      new ChantaYaku(),
      new ChiihouYaku(),
      new ChiitoitsuYaku(),
      new ChinitsuYaku(),
      new ChinroutouYaku(),
      new ChuurenPoutouYaku({ allowDoubleYakuman: false }),
      new DaisangenYaku(),
      new DaisuushiiYaku({ allowDoubleYakuman: false }),
      new HaiteiRaoyueYaku(),
      new HonitsuYaku(),
      new HonroutouYaku(),
      new HouteiRaoyuiYaku(),
      new IipeikouYaku(),
      new IttsuuYaku(),
      new JunchanYaku(),
      new KokushiMusouYaku({ allowDoubleYakuman: false }),
      new MenzenTsumoYaku(),
      new PinfuYaku(),
      new RenhouYaku({ hanValue: 5 }),
      new RiichiYaku(),
      new DoubleRiichiYaku(),
      new IppatsuYaku(),
      new RinshanKaihouYaku(),
      new RyanpeikouYaku({ allowOpen: false }),
      new RyuuiisouYaku(),
      new SanankouYaku(),
      new SankantsuYaku(),
      new SanshokuDoujunYaku(),
      new SanshokuDoukouYaku(),
      new ShousangenYaku(),
      new ShousuushiiYaku(),
      new SuuankouYaku({ allowDoubleYakuman: false }),
      new SuukantsuYaku(),
      new TanyaoYaku({ allowOpen: true }),
      new TenhouYaku(),
      new ToitoiYaku(),
      new TsuuiisouYaku(),
      new YakuhaiYaku()
    ], {
      stackableYakuman: true
    })
  }
}

export default WrcHanCalculator
