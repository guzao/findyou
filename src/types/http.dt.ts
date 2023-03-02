import { Directive } from "vue"

type ResultBaseData = {
  data: any,
  msg: string,
  code: number
}

type CustomeDirective =  Directive & { name: string }