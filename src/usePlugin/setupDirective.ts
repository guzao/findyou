import type { App } from 'vue'
import { bubble, outClick } from '@/directives'


const directives = [ bubble, outClick]
/** 指令注册 */
export function useDirective (appInstance: App<Element>) {
  directives.forEach(item => {
    appInstance.directive(item.name, item)
  })
}