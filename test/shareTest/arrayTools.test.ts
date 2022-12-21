import { describe, test, expect, it } from 'vitest'

import { getArrayLength, arrayIsEmpty, arrayNotEmpty, getArrayLastIndex, arrayGroupBy, arrayToTree, deduplicate, rangeFind } from '../../src/share'

describe('test arrayTools', () => {

  test('getArrayLength', () => {
    expect(getArrayLength([])).toBe(0)
    expect(getArrayLength([1])).toBe(1)
  })

  test('arrayIsEmpty', () => {
    expect(arrayIsEmpty([])).toBe(true)
    expect(arrayIsEmpty([1])).toBe(false)
  })

  test('arrayNotEmpty', () => {
    expect(arrayNotEmpty([])).toBe(false)
    expect(arrayNotEmpty([1])).toBe(true)
  })

  test('getArrayLastIndex', () => {
    expect(getArrayLastIndex([])).toBe(-1)
    expect(getArrayLastIndex([1])).toBe(0)
    expect(getArrayLastIndex([1, 1])).toBe(1)
  })

  test('arrayGroupBay', () => {

    const groupList = [
      { type: 'car', name: '宝马' },
      { type: 'car', name: '奥迪' },
      { type: 'dog', name: '泰迪' },
      { type: 'dog', name: '二哈' },
    ]

    const exec = {
      "car": [
        { type: 'car', name: '宝马' },
        { type: 'car', name: '奥迪' },
      ],
      "dog": [
        { type: 'dog', name: '泰迪' },
        { type: 'dog', name: '二哈' },
      ]
    }

    const groupList1 = [
      { type: '手机', name: '小米' },
      { type: '手机', name: '红米' },
      { type: '电脑', name: '华为' },
      { type: '电脑', name: '苹果' },
    ]

    const exec1 = {
      "手机": [
        { type: '手机', name: '小米' },
        { type: '手机', name: '红米' },
      ],
      "电脑": [
        { type: '电脑', name: '华为' },
        { type: '电脑', name: '苹果' },
      ]
    }

    expect(arrayGroupBy(groupList, (item) => item.type)).toEqual(exec)
    expect(arrayGroupBy(groupList1, (item) => item.type)).toEqual(exec1)

  })

  test('arrayToTree', () => {

    const arr = [
      { parentId: 0, label: '层级1', id: 1 },
      { parentId: 1, label: '层级2', id: 2, },
      { parentId: 2, label: '层级3', id: 3, },
    ]

    const exec = [
      {
        parentId: 0, label: '层级1', id: 1,
        children: [
          {
            parentId: 1, label: '层级2', id: 2,
            children: [
              { parentId: 2, label: '层级3', id: 3, }
            ]
          }
        ]
      }
    ]

    expect(arrayToTree(arr)).toEqual(exec)

  })

  test('deduplicate', () => {

    const data = [1, 1, 2, 2]
    const exec = [1, 2]
    const res = deduplicate(data, (item) => item)
    expect(res).toEqual(exec)

    const data1 = [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 1, name: '1' }, { id: 2, name: '2' }]
    const exec1 = [
      {
        "id": 1,
        "name": "1"
      },
      {
        "id": 2,
        "name": "2"
      }
    ]
    const res1 = deduplicate(data1, (item) => item.id)
    expect(res1).toEqual(exec1)

  })

  test('getArrayLength', () => {

    const exec1 = [
      {
        "start": {
          "value": 2,
          "index": 1
        },
        "end": {
          "value": 5,
          "index": 4
        }
      },
      {
        "start": {
          "value": 2,
          "index": 6
        },
        "end": {
          "value": 6,
          "index": 10
        }
      },
      {
        "start": {
          "value": 2,
          "index": 12
        },
        "end": {
          "value": 2,
          "index": 12
        }
      }
    ]

    const res = rangeFind([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6, 1, 2], (item) => item > 1)
    expect(res).toEqual(exec1)


    const exec2 = [
      {
        "start": {
          "value": {
            "number": 2
          },
          "index": 0
        },
        "end": {
          "value": {
            "number": 4
          },
          "index": 2
        }
      },
      {
        "start": {
          "value": {
            "number": 2
          },
          "index": 4
        },
        "end": {
          "value": {
            "number": 3
          },
          "index": 6
        }
      }
    ]
    const res1 = rangeFind([{ number: 2 }, { number: 3 }, { number: 4 }, { number: 1 }, { number: 2 }, { number: 2 }, { number: 3 }, { number: 1 }], (item) => item.number > 1)
    expect(res1).toEqual(exec2)

  })


})

