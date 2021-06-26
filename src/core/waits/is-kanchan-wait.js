import { Sequence } from './../combinaison-classes'

function isKanchanWait ({ concealedCombinaisons, winningCombinaisonIndex, winningTileIndex }) {
  const winningCombinaison = concealedCombinaisons[winningCombinaisonIndex]
  return winningCombinaison != null && winningCombinaison instanceof Sequence && winningTileIndex === 1
}

export default isKanchanWait
