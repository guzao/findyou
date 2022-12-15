
/**
 * 字符串为空
*/
export function stringIsEmpty (str: string): boolean{
  return !str.length
}

/**
 * 字符串不为空
*/
export function stringNotEmpty (str: string): boolean{
  return !!str.length
}

/**
 * 字符串分割并且取出指定下标的元素
 * @param str 字符
 * @param separator 分割符
 * @param elmentIndex 指定下标的元素
*/
export function stringSplit (str: string, separator: string, elmentIndex: number) {
  if (stringNotEmpty(str)) {
    return str.split(separator)[elmentIndex]
  } else {
    return ''
  }
}