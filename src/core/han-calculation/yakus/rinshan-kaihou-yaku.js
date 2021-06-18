/**
 * Rinshan Kaihou (After Kan) yaku pattern<br><br>
 *
 * Winning after drawing a replacement tile.<br><br<
 *
 * Must be concealed: no<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class RinshanKaihouYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('rinshan kaihou')) return { key: 'rinshan kaihou', hanValue: 1, yakumanValue: 0 }
  }
}

export default RinshanKaihouYaku
