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
    message.error(msg || '后台返回数据格式错误')
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
 * 深度循环，只要子节点的children || 特定属性为数组，且元素不为空， 则递归执行
 */
export function depEach <T> (data: T [], clallBack: (item: T) => void, key?: string) {
  data.forEach(item => {
    clallBack(item)
    let children = key ? (item as any)[key] : (item as any).children
    if (children) depEach(children, clallBack)
  })
}


/**
 * 检查数据类型
*/
export function typeChecking (data: any): string {
  return Object.prototype.toString.call(data).split(' ')[1].replace(']', '')
}