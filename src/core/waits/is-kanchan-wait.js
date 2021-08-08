import { Sequence } from './../combination-classes'

function isKanchanWait ({ concealedCombinations, winningCombinationIndex, winningTileIndex }) {
  const winningCombination = concealedCombinations[winningCombinationIndex]
  return winningCombination != null && winningCombination instanceof Sequence && winningTileIndex === 1
}

export default isKanchanWait
