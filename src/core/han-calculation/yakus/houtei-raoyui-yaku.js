/**
 * Houtei Raoyui (Last Tile Discard) yaku pattern<br><br>
 *
 * Winning on the very last discard<br><br>
 *
 * Must be concealed: no<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class HouteiRaoyuiYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('houtei raoyui')) return { key: 'houtei raoyui', hanValue: 1, yakumanValue: 0 }
  }
}

export default HouteiRaoyuiYaku
