import * as FuCalculation from './../core/fu-calculation'
import * as HanCalculation from './../core/han-calculation'
import PointCalculator from './../core/point-calculation/point-calculator'
import fourPlayerGameTiles from './helpers/four-player-game-tiles'

const defaultInfo = {
  kazoeYakumanAsSanbaiman: false,
  allowMultipleYakuman: true,
  allowDoubleYakuman: true,
  allowOpenTanyao: true,
  allowDoubleWindFu: true,
  renhouValue: 'yakuman',

  // optional yaku
  allowOpenRiichi: false
}

export const key = 'custom'

export function create (options) {
  const mergedOptions = options == null ? { ...defaultInfo } : { ...defaultInfo, ...options }

  return {
    key,
    options: mergedOptions,

    fuCalculator: createFuCalculator(mergedOptions),
    hanCalculator: createHanCalculator(mergedOptions),
    pointCalculator: craetePointCalculator(mergedOptions),

    tiles: fourPlayerGameTiles
  }
}

function createFuCalculator (options) {
  return new FuCalculation.FuCalculator([
    // put the chiitoitsu rule at the top because it's a fixed amount of fu
    new FuCalculation.ChiitoitsuFuRule({ chiitoitsuYakuPattern: new HanCalculation.ChiitoitsuYaku(), fuValue: 25 }),
    new FuCalculation.WinningFuRule(),
    new FuCalculation.CombinationsFuRule(),
    new FuCalculation.PairFuRule({ stackable: options.allowDoubleWindFu }),
    new FuCalculation.WaitFuRule(),
    new FuCalculation.OpenPinfuFuRule(),
    new FuCalculation.ClosedRonFuRule(),
    new FuCalculation.TsumoFuRule({ excludedYakuPatterns: [new HanCalculation.PinfuYaku()] })
  ])
}

function createHanCalculator (options) {
  const yakuList = [
    new HanCalculation.ChankanYaku(),
    new HanCalculation.ChantaYaku(),
    new HanCalculation.ChiihouYaku(),
    new HanCalculation.ChiitoitsuYaku(),
    new HanCalculation.ChinitsuYaku(),
    new HanCalculation.ChinroutouYaku(),
    new HanCalculation.ChuurenPoutouYaku({ allowDoubleYakuman: options.allowDoubleYakuman }),
    new HanCalculation.DaisangenYaku(),
    new HanCalculation.DaisuushiiYaku({ allowDoubleYakuman: options.allowDoubleYakuman }),
    new HanCalculation.HaiteiRaoyueYaku(),
    new HanCalculation.HonitsuYaku(),
    new HanCalculation.HonroutouYaku(),
    new HanCalculation.HouteiRaoyuiYaku(),
    new HanCalculation.IipeikouYaku(),
    new HanCalculation.IttsuuYaku(),
    new HanCalculation.JunchanYaku(),
    new HanCalculation.KokushiMusouYaku({ allowDoubleYakuman: options.allowDoubleYakuman }),
    new HanCalculation.MenzenTsumoYaku(),
    new HanCalculation.PinfuYaku(),
    new HanCalculation.RenhouYaku(mapYakuValue(options.renhouValue)),
    new HanCalculation.RiichiYaku(),
    new HanCalculation.DoubleRiichiYaku(),
    new HanCalculation.IppatsuYaku(),
    new HanCalculation.RinshanKaihouYaku(),
    new HanCalculation.RyanpeikouYaku({ allowOpen: false }),
    new HanCalculation.RyuuiisouYaku(),
    new HanCalculation.SanankouYaku(),
    new HanCalculation.SankantsuYaku(),
    new HanCalculation.SanshokuDoujunYaku(),
    new HanCalculation.SanshokuDoukouYaku(),
    new HanCalculation.ShousangenYaku(),
    new HanCalculation.ShousuushiiYaku(),
    new HanCalculation.SuuankouYaku({ allowDoubleYakuman: options.allowDoubleYakuman }),
    new HanCalculation.SuukantsuYaku(),
    new HanCalculation.TanyaoYaku({ allowOpen: options.allowOpenTanyao }),
    new HanCalculation.TenhouYaku(),
    new HanCalculation.ToitoiYaku(),
    new HanCalculation.TsuuiisouYaku(),
    new HanCalculation.YakuhaiYaku()
  ]

  if (options.allowOpenRiichi) yakuList.push(new HanCalculation.OpenRiichiYaku({ ronAsYakuman: false }))

  return new HanCalculation.HanCalculator(yakuList, {
    stackableYakuman: options.allowMultipleYakuman
  })
}

function craetePointCalculator (options) {
  return new PointCalculator({
    kazoeYakumanAsSanbaiman: options.kazoeYakumanAsSanbaiman
  })
}

function mapYakuValue (value) {
  if (value === 'mangan') return { hanValue: 5, yakumanValue: 0 }
  else if (value === 'yakuman') return { hanValue: 0, yakumanValue: 1 }
  throw new Error(`Can't map [${value}] yaku value`)
}
