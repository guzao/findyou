import { describe, test, expect, it } from 'vitest'
import { isRef } from 'vue'
import { useState } from '../../src/hooks'
import { getArrayLength } from '../../src/share'


describe('test useSate', () => {

  test('number', () => {
    const [ state, setState ] = useState(1)
    expect( typeof state.value).toBe('number')
    expect(isRef(state)).toBe(true)
    expect(state.value).toBe(1)

    setState(2)
    expect(state.value).toBe(2)
  })

  test('boolean', () => {

    const [ state, setState ] = useState(false)
    expect( typeof state.value).toBe('boolean')
    expect(isRef(state)).toBe(true)
    expect(state.value).toBe(false)

    setState(true)
    expect(state.value).toBe(true)
  })

  test('object', () => {

    const [ state, setState ] = useState({})
    expect( typeof state.value).toBe('object')
    expect(isRef(state)).toBe(true)

    setState({...state.value, id: 1})

    expect(state.value).toEqual({ id: 1 })

    setState({ ...state.value, nam: 1 })

    expect(state.value).toEqual({ id: 1, nam: 1 })

    setState({ ...state.value, id: 2, nam: 2 })

    expect(state.value).toEqual({ id: 2, nam: 2 })

  })

  test('array', () => {

    const [ state, setState ] = useState([] as number [])

    expect(Array.isArray(state.value)).toBe(true)

    expect(isRef(state)).toBe(true)

    expect(getArrayLength(state.value)).toBe(0)

    setState([...state.value, 1])

    expect(getArrayLength(state.value)).toBe(1)

  })

})