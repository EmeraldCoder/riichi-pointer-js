/**
 * Riichi yaku pattern<br><br>
 *
 * Waiting hand with declaration and 1000 point buy in.<br><br>
 *
 * Must be concealed: yes<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class RiichiYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('riichi')) return { key: 'riichi', hanValue: 1, yakumanValue: 0 }
  }
}

export default RiichiYaku
