import { createPinia } from 'pinia'
import type { App } from 'vue' 

export function usePinia (app: App<Element>) {
  const pinia = createPinia()
  app.use(pinia)
}