import { describe, test, expect } from 'vitest'
import { objectIsEmpty, objectNotEmpty, objectToArray } from '../../src/share/objectTools'

describe('objectTools', () => {

  test('objectIsEmpty', () => {
    expect(objectIsEmpty({})).toBe(true)
    expect(objectIsEmpty({ name: 21, id: 12 })).toBe(false)
  })

  test('objectNotEmpty', () => {
    expect(objectNotEmpty({})).toBe(false)
    expect(objectNotEmpty({ name: 21, id: 12 })).toBe(true)
    expect(objectNotEmpty({ name: 21, id: 12 })).toBe(true)
  })

  
  test('objectToArray', () => {

    const data = {
      1: { id: 1 },
      2: { id: 2 },
    }

    const exec = [
      { id: 1 },
      { id: 2 },
    ]

    const res = objectToArray(data)
    res.forEach(ite => ite[2])

    expect(objectToArray(data)).toEqual(exec)

  })

})