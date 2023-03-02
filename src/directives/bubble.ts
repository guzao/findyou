import type { Directive } from 'vue'

type BubbleEelment = HTMLElement & { handle: (e: MouseEvent) => void }

export const bubble : Directive & { name: string } =  {
  name: 'bubble',
  mounted (el: BubbleEelment, binding, vnode) {
    setMountElStyle(el)
    el.handle = (event) => {
      const node = createBubbleNode(event, el)
      el.appendChild(node)
    }
    el.addEventListener('click', el.handle)
  },
  beforeUnmount (el: BubbleEelment) {
    el.removeEventListener('click', el.handle)
  }
}

function createBubbleNode (event: MouseEvent, mountEl: BubbleEelment): HTMLSpanElement{
  const { offsetX, offsetY } = event
  const node = document.createElement('span')
  node.className = 'bubble_node'
  node.style.height = '20px'
  node.style.width = '20px'
  node.style.position = 'absolute'
  node.style.left = `${ offsetX - 10 }px` 
  node.style.top = `${ offsetY - 10}px` 
  node.style.borderRadius = '50%'
  node.style.opacity = '0.2'
  setTimeout(() => {
    node.remove()
  }, 2000)
  return node
}

function setMountElStyle ( mountEl: BubbleEelment) {
  mountEl.style.cursor = 'pointer'
  mountEl.style.overflow = 'hidden'
  mountEl.style.position = 'relative'
}
