/**
 * Ippatsu (One Shot) yaku pattern<br><br>
 *
 * Winning within the first uninterrupted go around after declaring riichi.<br><br>
 *
 * Must be concealed: yes<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class IppatsuYaku {
  /** @override */
  check ({ yakus }) {
    if (yakus.includes('ippatsu')) return { key: 'ippatsu', hanValue: 1, yakumanValue: 0 }
  }
}

export default IppatsuYaku
