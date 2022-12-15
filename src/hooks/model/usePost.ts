
import { onMounted } from "vue";
import { useState } from "./useState";
import { hasError } from '@/share'

/** 获取数据 */
interface UsePostParams <T> {
  /** 获取数据的方法 */
  getMethod: () => Promise<ResultBaseData>,
  /** 初始化数据 */
  initData: T,
  /** 对接口的返回值做处理 处理后必须将结果返回 */
  processResult?: (data: any) => any;
  /** 初始化是否立即调用接口获取数据 */
  initCallback: boolean;
}

/**
 * 获取数据
*/
export function usePost <T> (usePostParams: UsePostParams<T>) {
  
  const { getMethod, initData, processResult, initCallback = true } = usePostParams

  const [ loading, setLoading ] = useState(false)

  const [ resultData, setResultData ] = useState(initData)

  const getResult = async () => {
    try {
      setLoading(true)
      const result = await getMethod()
      setLoading(false)
      const { data } = result
      if (hasError(result)) return 
      if (processResult) {
        setResultData(processResult(data))
      } else {
        setResultData(data)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  onMounted(() => {
    initCallback && getResult()
  })
  

  return {
    loading,
    getResult,
    resultData,
    setResultData
  }

}
