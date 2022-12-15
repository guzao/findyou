import type { App } from 'vue' 
import { createI18n } from 'vue-i18n'
import { ZH, EN } from '@/i18n'

export function useI18n (app: App<Element>) {
  const I18n = createI18n({
    locale: 'ZH',
    messages: {
      'ZH': ZH,
      'EN': EN
    }
  })

  app.use(I18n)

  return I18n
}