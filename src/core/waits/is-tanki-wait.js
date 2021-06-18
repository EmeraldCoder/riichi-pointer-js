import { Pair, Orphan } from './../combinaison-classes'

function isTankiWait ({ concealedCombinaisons, winningCombinaisonIndex }) {
  const nbOrphans = concealedCombinaisons.filter(x => x instanceof Orphan).length
  const winningCombinaison = concealedCombinaisons[winningCombinaisonIndex]
  return winningCombinaison != null && winningCombinaison instanceof Pair && nbOrphans === 0
}

export default isTankiWait
