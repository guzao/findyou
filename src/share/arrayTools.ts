import { depCloe } from './tools'

/**
 * 获取数组的长度
 * @param data
*/
export function getArrayLength<T>(data: T[]): number {
  return data.length
}

/**
 * 数组是否为空
 * @param data
*/
export function arrayIsEmpty<T>(data: T[]): boolean {
  return !getArrayLength(data)
}


/**
 * 数组是否不为空
 * @param data
*/
export function arrayNotEmpty<T>(data: T[]): boolean {
  return !!getArrayLength(data)
}

/**
 * 获取数组的最后一个下索引
 * @param data
*/
export function getArrayLastIndex<T>(data: T[]): number {
  if (arrayIsEmpty(data)) {
    return -1
  }
  return getArrayLength(data) - 1
}

/**
 * 获取数组分组
 * @param data
*/
export function arrayGroupBy<T>(data: T[], callback: (item: T, index: number) => string) {

  const groupMap: Record<string, T[]> = {}

  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    const key = callback(element, index)
    if (key) {
      const group = groupMap[key]
      group
        ? group.push(element)
        : groupMap[key] = [element]
    }
  }

  return groupMap

}


type ArrayToTree = {
  parentId: number,
  id: number,
  children?: ArrayToTree[]
}

/**
 * 平级数组转树形结构
 * @param data 原数组
*/
export function arrayToTree<T extends ArrayToTree> (data: T[]) {

  const parent = data.filter(item => item.parentId === 0) 
  const children = data.filter(item => item.parentId !== 0)

  recursiveEach(parent, children)

  return parent

}

function recursiveEach<T extends ArrayToTree>(parent: T[], children: T[]) {

  parent.forEach(parentItem => {

    const { id } = parentItem
    children.forEach((childrenItem, index) => {
      const { parentId } = childrenItem
      if (parentId === id) {
        if (parentItem.children) {
          parentItem.children.push(childrenItem)
        } else {
          parentItem.children = [ childrenItem ]
        }
        const newChildren = depCloe(children)
        newChildren.splice(index, 1)
        recursiveEach([childrenItem], newChildren)
      }
    })

  })

} 



/**
 * 数组去重
 * @param originData 原数组
 * @param callback 去重逻辑处理函数，必须返回去重条件
*/
export function deduplicate <T> (originData: T [], callback: (itme: T, index: number) => string | number): T [] {

  const map: Map<string | number, T> = new Map()

  const result: T [] = []

  for (let index = 0; index < originData.length; index++) {
    const element = originData[index];
    const key = callback(element, index)
    map.set(key, element)
  }
  
  map.forEach(item => result.push(item))
  
  return result

}