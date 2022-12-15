import { onMounted, onUnmounted, ref } from 'vue'

const hasWindow = (origin: any) => window === origin

interface UseEvevetParams <K> {
  element: string | Window & typeof globalThis;
  eventName: K;
  handle: (even: any) => void;
  options?: AddEventListenerOptions;
  /** 事件销毁时执行 */
  scheduler?:() => void
}
/** 注册事件 */
export function useEvent <K extends keyof WindowEventMap> (params: UseEvevetParams<K>) {

  const { element, eventName, handle, options = {}, scheduler } = params
  
  const addEventListener = () => 
    hasWindow(element) 
                      ? window.addEventListener(eventName, handle, options) 
                      : document.querySelector(element as string)?.addEventListener(eventName, handle, options)

  const removeEventListener = () => 
    hasWindow(element) 
                        ? window.removeEventListener(eventName, handle, options)
                        : document.querySelector(element as string )?.removeEventListener(eventName, handle, options)


  onMounted(() => {
    addEventListener()
  })

  onUnmounted(() => {
    removeEventListener()
    scheduler && scheduler()
  })

  return removeEventListener

}




/** 注册window窗口变化事件 */
export function useWindowResize (handele: () => void, options: AddEventListenerOptions = {}) {
  const removeEventListener = useEvent({ element: window, eventName: 'resize', handle: handele, options: options })
  return removeEventListener
}




/**  */
export function useMouse (element: string) {
  const x = ref(0)
  const y = ref(0)
  const handele = (evevt: MouseEvent) => {
    const { pageX, pageY } = evevt
    x.value = pageX
    y.value = pageY
  }
  const removeEventListener = useEvent({ element: element, eventName: 'mousemove', handle: handele })
  return {
    x,
    y,
    removeEventListener
  }
}
