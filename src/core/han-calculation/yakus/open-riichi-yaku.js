/**
 * Open Riichi optional yaku pattern<br><br>
 *
 * The principle works exactly in the same way as the original riichi. However, there is an added bonus of 1-han attached, which is earned by revealing either the hand or the tile waits.<br><br>
 *
 * Must be concealed: yes<br>
 * Han: 1 (or yakuman if ron in some ruleset)
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class OpenRiichiYaku {
  constructor (options) {
    this.ronAsYakuman = options?.ronAsYakuman ?? false
  }

  /** @override */
  check ({ yakus, winningType }) {
    if (yakus.includes('open riichi')) {
      if (winningType === 'ron' && this.ronAsYakuman) return { key: 'open riichi', hanValue: 0, yakumanValue: 1 }
      return { key: 'open riichi', hanValue: 1, yakumanValue: 0 }
    }
  }
}

export default OpenRiichiYaku
