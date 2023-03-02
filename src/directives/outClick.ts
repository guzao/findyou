import type { Directive } from 'vue'

type BubbleEelment = HTMLElement & { handle: (e: MouseEvent) => void }

export const outClick = {
  name: 'outClick',
  mounted (el: BubbleEelment, binding, vnode) {
    el.handle = (event) => {
      console.log(vnode)
    }
    el.addEventListener('click', el.handle)
  },
  beforeUnmount (el: BubbleEelment) {
    el.removeEventListener('click', el.handle)
  }
} as Directive & { name: string }
