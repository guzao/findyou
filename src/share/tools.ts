import { ResultState } from "@/enum"
import { message } from "ant-design-vue"

export const parse = JSON.parse
export const stringify = JSON.stringify
export const ownKeys = Reflect.ownKeys
export const hasOwn = Object.hasOwn
export const isArray = Array.isArray


export function hasError (result: ResultBaseData) {
  const { code, msg } = result
  if (code !== ResultState.SUCCESS) {
    message.error(msg)
    return true
  }
}


/**
 * 数据深度克隆 不可克隆 function Date 正则 
 * @param originData
*/
export function depCloe <T> (originData: T): T {
  return parse(stringify(originData)) as T
}


/**
 * 数据挂载到Map结构上 方便查找
 * @param originData
*/
export function crateMap <T> (data: T [], mapKey: keyof T): Map<keyof T, T> {
  const map: Map<any, T> = new Map()
  depEach(data, (item) => {
    const key = item[ mapKey ]
    map.set(key, item)
  })
  return map
}


/** 
 * 深度循环，只要子节点的children属性为数组，且元素不为空， 则递归执行
 */
export function depEach <T> (data: T [], clallBack: (item: T) => void) {
  data.forEach(item => {
    clallBack(item)
    const children = (item as any).children
    if (children) {
      depEach(children, clallBack)
    }
  })
}
