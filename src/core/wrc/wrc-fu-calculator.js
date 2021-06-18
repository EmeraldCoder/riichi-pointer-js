import FuCalculator from './../fu-calculation/fu-calculator'

import WinRule from './../fu-calculation/rules/winning-fu-rule'
import WaitRule from './../fu-calculation/rules/wait-fu-rule'
import TsumoRule from './../fu-calculation/rules/tsumo-fu-rule'
import PairRule from './../fu-calculation/rules/pair-fu-rule'
import OpenPinfuRule from './../fu-calculation/rules/open-pinfu-fu-rule'
import CombinaisonsRule from './../fu-calculation/rules/combinaisons-fu-rule'
import ClosedRonRule from './../fu-calculation/rules/closed-ron-fu-rule'
import ChiitoitsuRule from './../fu-calculation/rules/chiitoitsu-fu-rule'

import ChiitoitsuYaku from './../han-calculation/yakus/chiitoitsu-yaku'
import PinfuYaku from './../han-calculation/yakus/pinfu-yaku'

/**
 * Fu calculator implementation using WRC ruleset.
 *
 * @memberof Wrc
 */
class WrcFuCalculator extends FuCalculator {
  constructor () {
    super([
      // put the chiitoitsu rule at the top because it's a fixed amount of fu
      new ChiitoitsuRule({ chiitoitsuYakuPattern: new ChiitoitsuYaku(), fuValue: 25 }),
      new WinRule(),
      new CombinaisonsRule(),
      new PairRule({ stackable: true }),
      new WaitRule(),
      new OpenPinfuRule(),
      new ClosedRonRule(),
      new TsumoRule({ excludedYakuPatterns: [new PinfuYaku()] })
    ])
  }
}

export default WrcFuCalculator
