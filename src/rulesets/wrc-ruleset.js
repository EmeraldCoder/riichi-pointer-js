import WrcFuCalculator from './../core/wrc/wrc-fu-calculator'
import WrcHanCalculator from './../core/wrc/wrc-han-calculator'
import WrcPointCalculator from './../core/wrc/wrc-point-calculator'
import fourPlayerGameTiles from './helpers/four-player-game-tiles'

// options are there only to be able to display them as readonly options in the configuration modal
// if you need to change the implementation, please refer to ./../core/wrc/* classes
const options = {
  kazoeYakumanAsSanbaiman: true,
  allowMultipleYakuman: true,
  allowDoubleYakuman: false,
  allowOpenTanyao: true,
  allowDoubleWindFu: false,
  renhouValue: 'mangan',

  // optional yaku
  allowOpenRiichi: false
}

export const key = 'wrc'

export function create () {
  return {
    key,
    options,

    fuCalculator: new WrcFuCalculator(),
    hanCalculator: new WrcHanCalculator(),
    pointCalculator: new WrcPointCalculator(),

    tiles: fourPlayerGameTiles
  }
}
