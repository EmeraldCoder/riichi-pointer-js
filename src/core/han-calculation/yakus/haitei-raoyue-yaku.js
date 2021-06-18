/**
 * Haitei Raoyue (Last Tile Draw) yaku pattern<br><br>
 *
 * Winning on the very last tile<br><br>
 *
 * Must be concealed: no<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class HaiteiRaoyueYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('haitei raoyue')) return { key: 'haitei raoyue', hanValue: 1, yakumanValue: 0 }
  }
}

export default HaiteiRaoyueYaku
