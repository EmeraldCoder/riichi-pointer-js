import { Sequence } from './../combination-classes'

function isPenchanWait ({ concealedCombinations, winningCombinationIndex, winningTileIndex }) {
  const winningCombination = concealedCombinations[winningCombinationIndex]

  if (winningCombination != null && winningCombination instanceof Sequence) {
    const winningTile = winningCombination.tiles[winningTileIndex]

    if (
      winningTile != null &&
      (
        (winningTileIndex === 0 && winningTile.value === 7) ||
        (winningTileIndex === 2 && winningTile.value === 3)
      )
    ) {
      return true
    }
  }

  return false
}

export default isPenchanWait
