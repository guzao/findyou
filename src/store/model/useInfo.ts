import { defineStore } from 'pinia'

export const useUserInfo = defineStore('userInfo', {
  state() {
      return {
        token: 'token',
        name: 'name'
      }
  },

  getters: {
    
  }

})