
import { depEach } from './tools'

/**
 * 递归Dom树
*/
export function eachElement (el: Element, callback: (node: Element) => void) {
  el.childNodes.forEach(node => {
    callback(node as Element)
    depEach(node.childNodes as any, callback, 'childNodes')
  })
} 
