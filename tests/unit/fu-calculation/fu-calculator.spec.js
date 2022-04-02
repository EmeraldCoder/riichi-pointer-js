import { describe, expect, test } from 'vitest'
import FuCalculator from '@/core/fu-calculation/fu-calculator'
import Hand from '@/core/hand'

const hand = new Hand() // just a placeholder because rule checkers will be mocked anyway

test('trying to instantiate the calculator without rules parameter should throw an error', () => {
  /* eslint-disable no-new */
  expect(() => { new FuCalculator() }).toThrow('rules parameter is required')
})

test('should support rule returning nothing', () => {
  const rules = [{ check () {} }]
  const result = new FuCalculator(rules).calculate(hand)
  expect(result.details).toStrictEqual([])
})

test('should support rule returning a fu info object', () => {
  const rules = [{ check: () => ({ key: 'test', fuValue: 1, quantity: 1 }) }]
  const result = new FuCalculator(rules).calculate(hand)
  expect(result.details).toStrictEqual([{ key: 'test', fuValue: 1, quantity: 1 }])
})

test('should support rule returning an array of fu info', () => {
  const rules = [
    { check: () => ({ key: 'test', fuValue: 1, quantity: 1 }) },
    { check: () => ({ key: 'test 2', fuValue: 2, quantity: 5 }) }
  ]

  const result = new FuCalculator(rules).calculate(hand)

  expect(result.details).toStrictEqual([
    { key: 'test', fuValue: 1, quantity: 1 },
    { key: 'test 2', fuValue: 2, quantity: 5 }
  ])
})

test('should return the total fu value of the hand', () => {
  const rules = [
    { check: () => ({ key: 'test', fuValue: 2, quantity: 1 }) },
    { check: () => ({ key: 'test 2', fuValue: 2, quantity: 4 }) }
  ]

  const result = new FuCalculator(rules).calculate(hand)

  expect(result.total).toBe(10)
})

test('should round up to the tens the total fu value of the hand', () => {
  const rules = [
    { check: () => ({ key: 'test', fuValue: 2, quantity: 1 }) },
    { check: () => ({ key: 'test 2', fuValue: 2, quantity: 5 }) }
  ]

  const result = new FuCalculator(rules).calculate(hand)

  expect(result.total).toBe(20)
})

describe('given a rule want to stop the process', () => {
  const rules = [
    {
      check (hand, context) {
        context.stop = true
        return { key: 'test', fuValue: 1, quantity: 1 }
      }
    },
    { check: () => ({ key: 'test 2', fuValue: 1, quantity: 1 }) }
  ]

  test('should not evaluate the next rules', () => {
    const result = new FuCalculator(rules).calculate(hand)
    expect(result.details).toStrictEqual([{ key: 'test', fuValue: 1, quantity: 1 }])
  })
})

describe('given a rule want to disable the rounding', () => {
  const rules = [
    {
      check (hand, context) {
        context.rounding = false
        return { key: 'test', fuValue: 25, quantity: 1 }
      }
    }
  ]

  test('should not round up to the tens the total fu value of the hand', () => {
    const result = new FuCalculator(rules).calculate(hand)
    expect(result.total).toBe(25)
  })
})
