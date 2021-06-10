import ChiitoitsuRule from '@/core/fu-calculation/rules/chiitoitsu-fu-rule'

const hand = {} // just a placeholder because the yaku checker will be mocked anyway

function makeDefaultFuCalculationContext () {
  return { stop: false, rounding: true }
}

test('trying to instantiate the rule without chiitoitsuYakuPattern option should throw an error', () => {
  const expectedError = 'chiitoitsuYakuPattern is required'
  expect(() => { new ChiitoitsuRule() }).toThrow(expectedError)
  expect(() => { new ChiitoitsuRule({}) }).toThrow(expectedError)
  expect(() => { new ChiitoitsuRule({ fuValue: 50 }) }).toThrow(expectedError)
})

describe('given the hand is not considered a chiitoitsu (seven pairs)', () => {
  const mockChiitoitsuYakuPattern = { check: () => false }

  test('should not return any fu info', () => {
    const context = makeDefaultFuCalculationContext()
    const result = new ChiitoitsuRule({ chiitoitsuYakuPattern: mockChiitoitsuYakuPattern }).check(hand, context)
    expect(result).toBeUndefined()
  })

  test('should not stop the process', () => {
    const context = makeDefaultFuCalculationContext()
    new ChiitoitsuRule({ chiitoitsuYakuPattern: mockChiitoitsuYakuPattern }).check(hand, context)
    expect(context.stop).toBe(false)
  })

  test('should not disable the rounding', () => {
    const context = makeDefaultFuCalculationContext()
    new ChiitoitsuRule({ chiitoitsuYakuPattern: mockChiitoitsuYakuPattern }).check(hand, context)
    expect(context.rounding).toBe(true)
  })
})

describe('given the hand is considered a chiitoitsu (seven pairs)', () => {
  const mockChiitoitsuYakuPattern = { check: () => true }

  test('should return 25 fu by default', () => {
    const context = makeDefaultFuCalculationContext()
    const result = new ChiitoitsuRule({ chiitoitsuYakuPattern: mockChiitoitsuYakuPattern }).check(hand, context)
    expect(result).toStrictEqual({ key: 'chiitoitsu', fuValue: 25, quantity: 1 })
  })

  test('should return the fu value corresponding to the rule option', () => {
    const context = makeDefaultFuCalculationContext()
    const result = new ChiitoitsuRule({ chiitoitsuYakuPattern: mockChiitoitsuYakuPattern, fuValue: 50 }).check(hand, context)
    expect(result).toStrictEqual({ key: 'chiitoitsu', fuValue: 50, quantity: 1 })
  })

  test('should stop the process', () => {
    const context = makeDefaultFuCalculationContext()
    new ChiitoitsuRule({ chiitoitsuYakuPattern: mockChiitoitsuYakuPattern }).check(hand, context)
    expect(context.stop).toBe(true)
  })

  test('should disable the rounding', () => {
    const context = makeDefaultFuCalculationContext()
    new ChiitoitsuRule({ chiitoitsuYakuPattern: mockChiitoitsuYakuPattern }).check(hand, context)
    expect(context.rounding).toBe(false)
  })
})
