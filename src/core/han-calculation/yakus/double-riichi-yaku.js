/**
 * Double Riichi yaku pattern<br><br>
 *
 * Declaring riichi within the first uninterrupted go around.<br><br>
 *
 * Must be concealed: yes<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class DoubleRiichiYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('double riichi')) return { key: 'double riichi', hanValue: 1, yakumanValue: 0 }
  }
}

export default DoubleRiichiYaku
