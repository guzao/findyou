import App from '@/App.vue'
import { createApp } from 'vue'
import { useAndDesign } from './useComponent'
import { usePinia } from './useStore'
import { useI18n } from './useVueI18n'

export function setupApp () {

  const appInstance = createApp(App)
  useAndDesign(appInstance)
  usePinia(appInstance)
  const I18n = useI18n(appInstance)
  
  appInstance.mount('#app')

}