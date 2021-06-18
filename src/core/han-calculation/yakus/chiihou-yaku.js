/**
 * Chiihou (Hand of earth)<br><br>
 *
 * A hand won by a non-dealer on his first draw when no open-meld declaration has been made<br><br>
 *
 * Must be concealed: yes<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ChiihouYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('chiihou')) return { key: 'chiihou', hanValue: 0, yakumanValue: 1 }
  }
}

export default ChiihouYaku
