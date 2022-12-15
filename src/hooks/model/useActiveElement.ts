import { useState } from "./useState";


export function useActiveElement () {
  // useActiveElement
  const [ activeElement, serActiveElement ] = useState(document)
}