/**
 * Chankan (Robbing the kan) yaku pattern<br><br>
 *
 * Winning on off a tile used to extend a kong.<br><br>
 *
 * Must be concealed: no<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class ChankanYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('chankan')) return { key: 'chankan', hanValue: 1, yakumanValue: 0 }
  }
}

export default ChankanYaku
