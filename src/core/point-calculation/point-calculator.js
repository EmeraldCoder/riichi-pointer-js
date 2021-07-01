class PointCalculator {
  constructor (options) {
    this.kazoeYakumanAsSanbaiman = options?.kazoeYakumanAsSanbaiman ?? true
  }

  calculate (hand, fu, han, yakuman) {
    if (yakuman > 0) return getPointForYakuman(hand, yakuman)
    if (han >= 13 && !this.kazoeYakumanAsSanbaiman) return getPointForYakuman(hand, 1)
    if (han >= 13 && this.kazoeYakumanAsSanbaiman) return getPointForSanbaiman(hand)
    if (han >= 11) return getPointForSanbaiman(hand)
    if (han >= 8) return getPointForBaiman(hand)
    if (han >= 6) return getPointForHaneman(hand)
    if (han === 5) return getPointForMangan(hand)
    if ((han === 3 && fu > 60) || (han === 4 && fu > 30)) return getPointForMangan(hand)
    return getPointFromManualCalculation(hand, fu, han)
  }
}

function getPointForYakuman (hand, yakuman) {
  return multiplyBy(yakuman, multiplyBy(4, (getPointForMangan(hand))))
}

function getPointForSanbaiman (hand) {
  return multiplyBy(3, getPointForMangan(hand))
}

function getPointForBaiman (hand) {
  return multiplyBy(2, getPointForMangan(hand))
}

function getPointForHaneman (hand) {
  return multiplyBy(1.5, getPointForMangan(hand))
}

function getPointForMangan (hand) {
  if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return { nonDealer: 4000 }
  if (hand.seatWind === 'east' && hand.winningType === 'ron') return { discard: 12000 }
  if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 4000, nonDealer: 2000 }
  if (hand.seatWind !== 'east' && hand.winningType === 'ron') return { discard: 8000 }
}

function getPointFromManualCalculation (hand, fu, han) {
  const basicPoints = fu * Math.pow(2, 2 + han)

  if (hand.seatWind === 'east' && hand.winningType === 'tsumo') {
    return { nonDealer: roundUpToTheHundreds(basicPoints * 2) }
  }

  if (hand.seatWind === 'east' && hand.winningType === 'ron') {
    return { discard: roundUpToTheHundreds(basicPoints * 6) }
  }

  if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') {
    return { dealer: roundUpToTheHundreds(basicPoints * 2), nonDealer: roundUpToTheHundreds(basicPoints) }
  }

  if (hand.seatWind !== 'east' && hand.winningType === 'ron') {
    return { discard: roundUpToTheHundreds(basicPoints * 4) }
  }
}

function roundUpToTheHundreds (value) {
  return Math.ceil(value / 100) * 100
}

function multiplyBy (factor, source) {
  if (source.discard != null) {
    return { discard: source.discard * factor }
  }

  if (source.nonDealer != null && source.dealer == null) {
    return { nonDealer: source.nonDealer * factor }
  }

  return { dealer: source.dealer * factor, nonDealer: source.nonDealer * factor }
}

export default PointCalculator
