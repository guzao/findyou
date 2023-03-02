import type { App } from 'vue' 
import NaiveuI from 'naive-ui'

export function useAndDesign (app: App<Element>) {
  app.use(NaiveuI, { size: 'small' })
}