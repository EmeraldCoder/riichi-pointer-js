/**
 * Renhou (Hand of man) yaku pattern<br><br>
 *
 * A hand won by a non-dealer with a discard tile on his first round without open-meld<br><br>
 *
 * Must be concealed: yes<br>
 * Han: usually 5 but some rule make it a yakuman
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class RenhouYaku {
  /**
   * @param {Object} options - Configuration options for the yaku
   * @param {number} [options.hanValue=5] - Han value return if the yaku is valid
   * @param {number} [options.yakumanValue=0] - Yakuman value return if the yaku is valid
   */
  constructor (options) {
    this.hanValue = options?.hanValue ?? 5
    this.yakumanValue = options?.yakumanValue ?? 0
  }

  /** @override */
  check ({ yakus }) {
    if (yakus.includes('renhou')) return { key: 'renhou', hanValue: this.hanValue, yakumanValue: this.yakumanValue }
  }
}

export default RenhouYaku
