import EmaFuCalculator from '../core/ema/ema-fu-calculator'
import EmaHanCalculator from '../core/ema/ema-han-calculator'
import EmaPointCalculator from '../core/ema/ema-point-calculator'
import fourPlayerGameTiles from './helpers/four-player-game-tiles'

// options are there only to be able to display them as readonly options in the configuration modal
// if you need to change the implementation, please refer to ./../core/ema/* classes
const options = {
  kazoeYakumanAsSanbaiman: true,
  allowMultipleYakuman: false,
  allowDoubleYakuman: false,
  allowOpenTanyao: true,
  allowDoubleWindFu: true,
  renhouValue: 'mangan',
  kiriageMangan: false,

  // optional yaku
  allowOpenRiichi: false
}

export const key = 'ema'

export function create () {
  return {
    key,
    options,

    fuCalculator: new EmaFuCalculator(),
    hanCalculator: new EmaHanCalculator(),
    pointCalculator: new EmaPointCalculator(),

    tiles: fourPlayerGameTiles
  }
}
