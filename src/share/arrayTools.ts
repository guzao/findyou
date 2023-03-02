import { depCloe, depEach } from './tools'

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
 * 获取数组的最后一个元素
 * @param data
*/
export function getArrayLastElement <T> (data: T []): T | undefined {
  if ( arrayIsEmpty(data) ) {
    return undefined
  }
  const lastIndex = getArrayLastIndex(data)
  const lastElement = data[lastIndex]
  return lastElement
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



type RangePoolItem <T> = { start: { value: T,  index: number }, end: { value: T,  index: number } } 
type RangeCacheItem <T> =  { value: T,  index: number }
type RangeCallback<T> = (item: T, index: number) => boolean 
/**
 * 查找数组中,数值的范围区间
*/
export function rangeFind <T> (originData: T [], callback: RangeCallback<T> ) {
   
  const rangePool: RangePoolItem<T> [] = []

  let rangeCache: RangeCacheItem<T> [] = []
  
  for (let index = 0; index < originData.length; index++) {
    const element = originData[index];
    if (callback(element, index)) {
      rangeCache.push({value: element, index: index})
    } else {
      const rangeNode = createrangeNode(rangeCache)
      if (rangeNode) {
        rangePool.push(rangeNode)
      }
      rangeCache.length = 0
    }
  }

  const rangeNode = createrangeNode(rangeCache)
  if (rangeNode) {
    rangePool.push(rangeNode)
  }

  rangeCache.length = 0

  return rangePool
}

function createrangeNode <T>(rangeCache: RangeCacheItem<T> []):RangePoolItem<T> | false {
  if (arrayIsEmpty(rangeCache)) return false 
  const end = getArrayLastElement(rangeCache)!
  const start = rangeCache[ 0 ]
  return {
    start,
    end
  }
}

/**
 * 统计某个数值出现的次数
*/
export function numericalStatistics <T extends number | string> (data: T [], key: T) {
  let count = 0
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (key == element) count++
  }
  return count
}


type BaseProp = { id: number | string }
/**
 * 数组转Map结构
*/
export function arratToMap <T extends BaseProp> (data: T [], childrenKey = 'children') {
  const marMap: Map<number| string, T> = new Map()
  depEach(data, (item) => marMap.set(item.id, item) )
  return marMap
} 
