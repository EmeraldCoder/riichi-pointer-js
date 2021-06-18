import PointCalculator from './../point-calculation/point-calculator'

class WrcPointCalculator extends PointCalculator {
  constructor () {
    super({
      allowMultipleYakuman: false
    })
  }
}

export default WrcPointCalculator
