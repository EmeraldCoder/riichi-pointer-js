import { Chii } from './../combinaison-classes'

function isPenchanWait ({ concealedCombinaisons, winningCombinaisonIndex, winningTileIndex }) {
  const winningCombinaison = concealedCombinaisons[winningCombinaisonIndex]

  if (winningCombinaison != null && winningCombinaison instanceof Chii) {
    const winningTile = winningCombinaison.tiles[winningTileIndex]

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
