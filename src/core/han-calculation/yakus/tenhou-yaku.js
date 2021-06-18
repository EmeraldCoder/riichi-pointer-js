/**
 * Tenhou (Heavenly Hand)<br><br>
 *
 * A hand won by the dealer on his first draw<br><br>
 *
 * Must be concealed: yes<br>
 * Yakuman: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class TenhouYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('tenhou')) return { key: 'tenhou', hanValue: 0, yakumanValue: 1 }
  }
}

export default TenhouYaku
