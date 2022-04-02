import { describe, expect, test } from 'vitest'
import HanCalculator from '@/core/han-calculation/han-calculator'
import Hand from '@/core/hand'

const hand = new Hand() // just a placeholder because rule checkers will be mocked anyway

test('trying to instantiate the calculator without yakus parameter should throw an error', () => {
  /* eslint-disable no-new */
  expect(() => { new HanCalculator() }).toThrow('yakus parameter is required')
})

test('should support yaku returning nothing', () => {
  const yakus = [{ check () {} }]
  const result = new HanCalculator(yakus).calculate(hand)
  expect(result.details).toStrictEqual([])
})

test('should support yaku returning a single han info object', () => {
  const yakus = [{ check: () => ({ key: 'test', hanValue: 1, yakumanValue: 0 }) }]
  const result = new HanCalculator(yakus).calculate(hand)
  expect(result.details).toStrictEqual([{ key: 'test', hanValue: 1, yakumanValue: 0 }])
})

test('should support yaku returning an array of han info', () => {
  const yakus = [
    { check: () => ({ key: 'test', hanValue: 1, yakumanValue: 0 }) },
    { check: () => ({ key: 'test 2', hanValue: 2, yakumanValue: 0 }) }
  ]

  const result = new HanCalculator(yakus).calculate(hand)

  expect(result.details).toStrictEqual([
    { key: 'test', hanValue: 1, yakumanValue: 0 },
    { key: 'test 2', hanValue: 2, yakumanValue: 0 }
  ])
})

test('should return the total han value of the hand', () => {
  const yakus = [
    { check: () => ({ key: 'test', hanValue: 2, yakumanValue: 0 }) },
    { check: () => ({ key: 'test 2', hanValue: 2, yakumanValue: 0 }) }
  ]

  const result = new HanCalculator(yakus).calculate(hand)

  expect(result.han).toBe(4)
})

test('should return null for the yakuman value of the hand', () => {
  const yakus = [
    { check: () => ({ key: 'test', hanValue: 2, yakumanValue: 0 }) },
    { check: () => ({ key: 'test 2', hanValue: 2, yakumanValue: 0 }) }
  ]

  const result = new HanCalculator(yakus).calculate(hand)

  expect(result.yakuman).toBeNull()
})

test('should add the number of dora to the han value of the hand', () => {
  const yakus = [
    { check: () => ({ key: 'test', hanValue: 2, yakumanValue: 0 }) }
  ]

  const result = new HanCalculator(yakus).calculate({ nbDora: 5 })

  expect(result.han).toBe(7)
  expect(result.details.filter(x => x.key === 'dora')).toStrictEqual([{ key: 'dora', hanValue: 5, yakumanValue: 0 }])
})

describe('given the hand is not eligible for any yaku', () => {
  const yakus = [{ check () {} }]

  test('should not add the number of dora to the han value of the hand', () => {
    const result = new HanCalculator(yakus).calculate({ nbDora: 5 })
    expect(result.han).toBeNull()
  })
})

describe('given the hand is a yakuman', () => {
  const yakus = [
    { check: () => ({ key: 'han test', hanValue: 1, yakumanValue: 0 }) },
    { check: () => ({ key: 'yakuman test', hanValue: 0, yakumanValue: 1 }) },
    { check: () => ({ key: 'yakuman test 2', hanValue: 0, yakumanValue: 2 }) }
  ]

  test('should return the total yakuman value of the hand', () => {
    const result = new HanCalculator(yakus, { stackableYakuman: true }).calculate(hand)
    expect(result.yakuman).toBe(3)
  })

  test('should return the total yakuman value of the hand using only the highest valued yakuman if the option stackableYakuman is at false', () => {
    const result = new HanCalculator(yakus, { stackableYakuman: false }).calculate(hand)
    expect(result.yakuman).toBe(2)
  })

  test('should return null for the han value of the hand', () => {
    const result = new HanCalculator(yakus, { stackableYakuman: true }).calculate(hand)
    expect(result.han).toBeNull()
  })

  test('should filter the details to keep only the details corresponding to yakuman', () => {
    const result = new HanCalculator(yakus, { stackableYakuman: true }).calculate(hand)
    expect(result.details).toStrictEqual([
      { key: 'yakuman test', hanValue: 0, yakumanValue: 1 },
      { key: 'yakuman test 2', hanValue: 0, yakumanValue: 2 }
    ])
  })

  test('should not add the number of dora to the han value of the hand', () => {
    const result = new HanCalculator(yakus, { stackableYakuman: true }).calculate({ nbDora: 5 })
    expect(result.han).toBeNull()
  })
})
