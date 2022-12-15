import { describe, test, expect, it } from 'vitest'
import { stringIsEmpty, stringNotEmpty } from '../../src/share'

describe('stringTools', () => {

  test('stringIsEmpty', () => {
    expect(stringIsEmpty('')).toBe(true)
    expect(stringIsEmpty('1')).toBe(false)
  })

  test('stringNotEmpty', () => {
    expect(stringNotEmpty('')).toBe(false)
    expect(stringNotEmpty('1')).toBe(true)
  })

})