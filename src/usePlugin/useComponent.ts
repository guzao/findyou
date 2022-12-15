import type { App } from 'vue' 
import andDesign from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


export function useAndDesign (app: App<Element>) {
  app.use(andDesign)
}