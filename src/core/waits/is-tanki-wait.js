import { Pair, Orphan } from './../combination-classes'

function isTankiWait ({ concealedCombinations, winningCombinationIndex }) {
  const nbOrphans = concealedCombinations.filter(x => x instanceof Orphan).length
  const winningCombination = concealedCombinations[winningCombinationIndex]
  return winningCombination != null && winningCombination instanceof Pair && nbOrphans === 0
}

export default isTankiWait
