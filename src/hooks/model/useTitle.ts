import { watch } from 'vue'
import { useState } from './useState'

export function useTitle (titleText: string = '') {
  const [ title, setTitle ] = useState(titleText)
  watch(title, () => document.title = title.value)
  return {
    title,
    setTitle
  }
}