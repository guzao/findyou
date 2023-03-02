import { service } from '../HTTP/index'

export function getUserInfo (params: object) {
  return service({
    method: 'get',
    url: 'http://jsonplaceholder.typicode.com/posts',
    data: params
  }) as Promise<ResultBaseData>
}