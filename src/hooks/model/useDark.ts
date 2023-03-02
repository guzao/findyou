import { onMounted, watch } from 'vue'
import { useStorage } from './useStorage'


interface UseDark {
  /** 类名挂载的元素 */
  mounteElement: string;
  /** 类名 */
  classNmae?: string;
  /** 初始化 */
  initData?: boolean;
}


/**
 * 切换暗夜模式
*/
export function useDark (darkParams: UseDark) {

  const { mounteElement, classNmae = 'dark', initData = false } = darkParams

  let elment: Element

  const { store : isDark, setStore:setIsDark } = useStorage({ key: 'isDark', defalutData: initData, StorageType: 'localStorage' })

  watch(isDark, () => {
    if (mounteElement) {
      init()
    }
  })



  const init = () => {
    isDark.value
    ? elment!.classList.add(classNmae)
    : elment!.classList.remove(classNmae)
  }

  onMounted(() => {
    elment = document.querySelector(mounteElement)!
    init()
  })

  const toggleDark = () => {
    setIsDark(!isDark.value)
  }

  return {
    isDark,
    toggleDark
  }

}