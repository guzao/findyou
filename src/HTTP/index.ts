import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建axios的实例
export const service = axios.create({
  baseURL: '',
  headers: {},
  withCredentials: false,
  timeout: 60000,
})


/** 请求前拦截 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  }, 
  (error) => {
    return Promise.reject(error);
  }

)


/** 响应拦截 */
service.interceptors.response.use(

  (response: AxiosResponse) => {
    const data = response.data
    // TODO
    // 接口返回的错误类型
    // 400 401 404 500 根据不同类型做特殊处理
    // 响应状态正常处理
    return data
  },

  (error) => {
    return Promise.reject(error)
  }

)
