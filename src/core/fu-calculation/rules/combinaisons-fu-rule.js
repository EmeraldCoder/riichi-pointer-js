import { HonorTile } from './../../tile-classes'
import { Triplet, Quad } from './../../combinaison-classes'

/**
 * Fu calculation rule that will attribute fu according to the hand's combinaisons.<br><br>
 *
 * <table>
 * <tr><th>Combinaison</th><th>Simples</th><th>Terminal / Honor</th></tr>
 * <tr><td>Minkou (Open Triplet)</td><td>2</td><td>4</td></tr>
 * <tr><td>Ankou (Concealed Triplet)</td><td>4</td><td>8</td></tr>
 * <tr><td>Minkan (Open Quad)</td><td>8</td><td>16</td></tr>
 * <tr><td>Ankan (Concealed Quad)</td><td>16</td><td>32</td></tr>
 * </table>
 *
 * @implements FuCalculation.FuRule
 * @memberof FuCalculation
 */
class CombinaisonsFuRule {
  /** @override */
  check (hand) {
    const result = []

    const counts = countCombinaisonType(hand)

    if (counts.minkouSimple > 0) result.push({ key: 'minkou simple', fuValue: 2, quantity: counts.minkouSimple })
    if (counts.minkouNonSimple > 0) result.push({ key: 'minkou non simple', fuValue: 4, quantity: counts.minkouNonSimple })
    if (counts.minkanSimple > 0) result.push({ key: 'minkan simple', fuValue: 8, quantity: counts.minkanSimple })
    if (counts.minkanNonSimple > 0) result.push({ key: 'minkan non simple', fuValue: 16, quantity: counts.minkanNonSimple })
    if (counts.ankouSimple > 0) result.push({ key: 'ankou simple', fuValue: 4, quantity: counts.ankouSimple })
    if (counts.ankouNonSimple > 0) result.push({ key: 'ankou non simple', fuValue: 8, quantity: counts.ankouNonSimple })
    if (counts.ankanSimple > 0) result.push({ key: 'ankan simple', fuValue: 16, quantity: counts.ankanSimple })
    if (counts.ankanNonSimple > 0) result.push({ key: 'ankan non simple', fuValue: 32, quantity: counts.ankanNonSimple })

    if (result.length > 0) return result
  }
}

function isSimpleTile (tile) {
  return !(tile instanceof HonorTile) && !tile.isTerminal()
}

function countCombinaisonType (hand) {
  let counts = {
    minkouSimple: 0,
    minkouNonSimple: 0,
    ankouSimple: 0,
    ankouNonSimple: 0,
    minkanSimple: 0,
    minkanNonSimple: 0,
    ankanSimple: 0,
    ankanNonSimple: 0
  }

  counts = hand.concealedCombinaisons.reduce((agg, combinaison, combinaisonIndex) => {
    if (combinaison instanceof Triplet) {
      if (hand.winningType === 'ron' && hand.winningCombinaisonIndex === combinaisonIndex) {
        if (isSimpleTile(combinaison.tiles[0])) {
          agg.minkouSimple++
        } else {
          agg.minkouNonSimple++
        }
      } else {
        if (isSimpleTile(combinaison.tiles[0])) {
          agg.ankouSimple++
        } else {
          agg.ankouNonSimple++
        }
      }
    } else if (combinaison instanceof Quad) {
      if (isSimpleTile(combinaison.tiles[0])) {
        agg.ankanSimple++
      } else {
        agg.ankanNonSimple++
      }
    }

    return agg
  }, counts)

  return hand.openCombinaisons.reduce((agg, combinaison) => {
    if (combinaison instanceof Triplet) {
      if (isSimpleTile(combinaison.tiles[0])) {
        agg.minkouSimple++
      } else {
        agg.minkouNonSimple++
      }
    } else if (combinaison instanceof Quad) {
      if (isSimpleTile(combinaison.tiles[0])) {
        agg.minkanSimple++
      } else {
        agg.minkanNonSimple++
      }
    }

    return agg
  }, counts)
}

export default CombinaisonsFuRule
