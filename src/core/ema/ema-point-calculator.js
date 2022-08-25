import PointCalculator from '../point-calculation/point-calculator'

class EmaPointCalculator extends PointCalculator {
  constructor () {
    super({
      kazoeYakumanAsSanbaiman: true,
      kiriageMangan: false
    })
  }
}

export default EmaPointCalculator
