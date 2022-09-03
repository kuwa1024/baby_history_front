import useSWR from 'swr'
import { Item, gets } from '../utils/firebase/items'

export type UseItems = {
  items: Item[]
  next: string | null
  isLoading: boolean
}

export function useItems(
  event: number,
  name?: string,
  cursor?: string | null
): UseItems {
  const { data, error } = useSWR([event, name, cursor], gets)
  if (error) {
    throw new Error(error)
  }

  const items = data?.items || []
  const next = data?.next || null
  return {
    items: items,
    next: next,
    isLoading: !data,
  }
}
