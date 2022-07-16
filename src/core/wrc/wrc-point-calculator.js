import PointCalculator from './../point-calculation/point-calculator'

class WrcPointCalculator extends PointCalculator {
  constructor () {
    super({
      kazoeYakumanAsSanbaiman: true,
      kiriageMangan: true
    })
  }
}

export default WrcPointCalculator
