import { arrayIsEmpty, arrayNotEmpty } from "./arrayTools"
import { ownKeys } from "./tools"


/**
 * 对象为空
 * @param data
*/
export function objectIsEmpty <T extends object> (data: T): boolean{
  return arrayIsEmpty(ownKeys(data))
}

/**
 * 对象不为空
 * @param data
*/
export function objectNotEmpty <T extends object> (data: T): boolean {
  return arrayNotEmpty(ownKeys(data))
}


/**
 * 对象转数组
 * @param data
*/
export function objectToArray (data: object) {
  if (objectNotEmpty(data)) {
   return Object.entries(data).map(item => {
    return item[1]
   })
  }
  return []
}

