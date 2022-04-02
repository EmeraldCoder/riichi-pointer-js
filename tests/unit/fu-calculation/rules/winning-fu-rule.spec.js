import { expect, test } from 'vitest'
import WinningFuRule from '@/core/fu-calculation/rules/winning-fu-rule'

test('should return 20 fu', () => {
  const result = new WinningFuRule().check()
  expect(result).toStrictEqual({ key: 'win', fuValue: 20, quantity: 1 })
})
