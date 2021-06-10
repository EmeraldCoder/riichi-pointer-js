export function calculatePoint (hand, han, fu, yakuman) {
  if (yakuman > 0 || han >= 13) { // yakuman
    if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 16000
    if (hand.seatWind === 'east' && hand.winningType === 'ron') return 48000
    if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 16000, nonDealer: 8000 }
    if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 32000
  } else if (han === 5) { // mangan
    if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 4000
    if (hand.seatWind === 'east' && hand.winningType === 'ron') return 12000
    if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 8000
    if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 4000, nonDealer: 2000 }
  } else if (han >= 6 && han <= 7) { // haneman
    if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 6000
    if (hand.seatWind === 'east' && hand.winningType === 'ron') return 18000
    if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 12000
    if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 6000, nonDealer: 3000 }
  } else if (han >= 8 && han <= 10) { // baiman
    if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 8000
    if (hand.seatWind === 'east' && hand.winningType === 'ron') return 24000
    if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 16000
    if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 8000, nonDealer: 4000 }
  } else if (han >= 11 && han <= 12) { // sanbaiman
    if (hand.seatWind === 'east' && hand.winningType === 'tsumo') return 12000
    if (hand.seatWind === 'east' && hand.winningType === 'ron') return 36000
    if (hand.seatWind !== 'east' && hand.winningType === 'ron') return 24000
    if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') return { dealer: 12000, nonDealer: 6000 }
  }

  var points = fu * Math.pow(2, 2 + han)
  var dealerPoints = points * 2
  var result = 0

  if (hand.seatWind === 'east') {
    if (hand.winningType === 'tsumo') {
      result = dealerPoints
    } else if (hand.winningType === 'ron') {
      result = dealerPoints * 3
    }
  } else {
    if (hand.winningType === 'tsumo') {
      result = {
        dealer: dealerPoints,
        nonDealer: points
      }
    } else if (hand.winningType === 'ron') {
      result = points * 4
    }
  }

  // The result is rounded up to the next hundred.
  if (hand.seatWind !== 'east' && hand.winningType === 'tsumo') {
    result.dealer = Math.ceil(result.dealer / 100) * 100
    result.nonDealer = Math.ceil(result.nonDealer / 100) * 100
  } else {
    result = Math.ceil(result / 100) * 100
  }

  // exceed are limit at mangan
  if (hand.seatWind === 'east' && hand.winningType === 'tsumo' && result > 4000) {
    result = 4000
  } else if (hand.seatWind === 'east' && hand.winningType === 'ron' && result > 12000) {
    result = 12000
  } else if (hand.seatWind !== 'east' && hand.winningType === 'tsumo' && result.dealer > 4000 && result.nonDealer > 2000) {
    result.dealer = 4000
    result.nonDealer = 2000
  } else if (hand.seatWind !== 'east' && hand.winningType === 'ron' && result > 8000) {
    result = 8000
  }

  return result
};
