import { Triplet, Quad } from './../../combination-classes'

/**
 * Yakuhai yaku pattern<br><br>
 *
 * A triplet or quad of dragon, round wind or seat wind<br><br>
 *
 * Must be concealed: no<br>
 * Han: 1
 *
 * @implements HanCalculation.Yaku
 * @memberof HanCalculation
 */
class YakuhaiYaku {
  /** @override */
  check ({ combinations, roundWind, seatWind }) {
    const yaku = combinations.reduce((agg, combination) => {
      if (combination instanceof Triplet || combination instanceof Quad) {
        const tile = combination.tiles[0]

        if (tile.value === 'red') agg.push({ key: 'chun', hanValue: 1, yakumanValue: 0 })
        else if (tile.value === 'green') agg.push({ key: 'hatsu', hanValue: 1, yakumanValue: 0 })
        else if (tile.value === 'white') agg.push({ key: 'haku', hanValue: 1, yakumanValue: 0 })
        else if (tile.value === roundWind || tile.value === seatWind) {
          agg.push({ key: mapWindKey(tile.value), hanValue: roundWind === seatWind ? 2 : 1, yakumanValue: 0 })
        }
      }

      return agg
    }, [])

    if (yaku.length > 0) return yaku
  }
}

function mapWindKey (wind) {
  if (wind === 'east') return 'ton'
  else if (wind === 'south') return 'nan'
  else if (wind === 'west') return 'xia'
  else if (wind === 'north') return 'pei'
}

export default YakuhaiYaku
