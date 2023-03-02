import { Ref, UnwrapRef, watch } from 'vue'
import { parse, stringify } from '@/share'
import { useState } from './useState'

interface UseStorage <T> {
  /** 缓存key */
  key: string;
  /** 缓存中取不到时使用的默认值 */
  defalutData: T,
  /** 本地存储的类型 */
  StorageType: 'localStorage' | 'sessionStorage';
}


/**
 * 使用本地存储，数据变化自动同步到本地缓存中
 * 
*/
export function useStorage <T> (useStorageParams: UseStorage<T>) {

  const [ isStop, setIsStop ] = useState(false)

  const { key, defalutData, StorageType } = useStorageParams
  const Storage = initStorageType(StorageType)
  const StorageValue = initStorageValue(Storage, key, defalutData) || defalutData
  const [ store, setStore ] = useState<T>(StorageValue)

  const stopWatch = watch(store, () => {
    Storage.setItem(key, stringify(store.value))
    isStop.value && stopWatch()
  })
  
  /** 移除数据 */
  const removeStorage = () => {
    Storage.removeItem(key)
    setIsStop(true)
  }
  

  return {
    store,
    setStore,
    removeStorage,
  } 

}

function initStorageType (StorageType: 'localStorage' | 'sessionStorage'): Storage {
  let storage: Storage;
  switch (StorageType) {
    case 'localStorage':
      storage = localStorage;
      break;
    case 'sessionStorage':
      storage = sessionStorage;
      break;
    default:
      storage = localStorage;
      break;
  }
  return storage!
}

function initStorageValue <T> (storage: Storage, key: string, defalutData: T) {
  const store = storage.getItem(key)
  if (store) {
    return parse(store)
  } else {
    // 不存在写入到内存中
    storage.setItem(key, stringify(defalutData))
    return parse(storage.getItem(key)!)
  }
}
