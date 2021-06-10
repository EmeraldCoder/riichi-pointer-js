import WaitRule from '@/core/fu-calculation/rules/wait-fu-rule'

describe('given the wait is a single wait', () => {
  const hand = { isSingleWait: () => true, isEdgeWait: () => false, isClosedWait: () => false }

  test('should return 2 fu', () => {
    const result = new WaitRule().check(hand)
    expect(result).toStrictEqual({ key: 'wait', fuValue: 2, quantity: 1 })
  })
})

describe('given the wait is a edge wait', () => {
  const hand = { isSingleWait: () => false, isEdgeWait: () => true, isClosedWait: () => false }

  test('should return 2 fu', () => {
    const result = new WaitRule().check(hand)
    expect(result).toStrictEqual({ key: 'wait', fuValue: 2, quantity: 1 })
  })
})

describe('given the wait is a closed wait', () => {
  const hand = { isSingleWait: () => false, isEdgeWait: () => false, isClosedWait: () => true }

  test('should return 2 fu', () => {
    const result = new WaitRule().check(hand)
    expect(result).toStrictEqual({ key: 'wait', fuValue: 2, quantity: 1 })
  })
})

describe('given the wait is not a single, edge or closed wait', () => {
  const hand = { isSingleWait: () => false, isEdgeWait: () => false, isClosedWait: () => false }

  test('should not return any fu info', () => {
    const result = new WaitRule().check(hand)
    expect(result).toBeUndefined()
  })
})
