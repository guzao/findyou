import { Ref, ref, UnwrapRef } from "vue";

type UseStateReturnType <T> = [ state: Ref<UnwrapRef<T>>, setState: (newSate: UnwrapRef<T>) => void ]

export function useState <T> (rawData: T): UseStateReturnType<T> {

  const state = ref<T>(rawData)

  const setState = (newSate: UnwrapRef<T>) => {
    state.value = newSate
  }

  return [
    state,
    setState
  ]

}