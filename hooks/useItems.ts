import { useEffect, useState } from 'react'
import { Item, getItems } from '../utils/firebase/items'

export type UseItemsOutput = {
  isLoading: boolean
  items: Item[]
}

const DEFAULT_OUTPUT: UseItemsOutput = {
  isLoading: true,
  items: [],
}

export function useItems(): UseItemsOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT)

  useEffect(() => {
    void (async () => {
      const { items } = await getItems()
      setOutput({ isLoading: false, items })
    })()
  }, [])

  return output
}
