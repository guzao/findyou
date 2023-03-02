import { defineStore } from 'pinia'
import { useStorage } from '@/hooks'

type UseInfo = {
  token: string;
  name: string;
}

const { setStore } = useStorage({ key: 'useInfo', defalutData: {} as UseInfo, StorageType: 'localStorage' })

export const useUserInfo = defineStore('userInfo', {
  state() {
      return {
        token: 'token',
        name: 'name',
        useInfo: {
          token: '',
          name: '',
        }
      }
  },

  actions: {
    setUserInfo () {
      const userInfo = {
        name: '测试信息',
        token: 'TOKEN'
      }
      setStore(userInfo)
      this.useInfo = userInfo
    }
  },

  getters: {
    
  }

})