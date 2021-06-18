/**
 * Menzen Tsumo (Fully Concealed Hand) yaku pattern<br><br>
 *
 * Going out on self-draw with a concealed hand.<br><br>
 *
 * Must be concealed: yes<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class MenzenTsumoYaku {
  /** @override */
  check ({ winningType, isOpen }) {
    if (winningType === 'tsumo' && !isOpen) {
      return { key: 'menzen tsumo', hanValue: 1, yakumanValue: 0 }
    }
  }
}

export default MenzenTsumoYaku
