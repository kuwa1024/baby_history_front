import useSWR from 'swr'
import { get } from '../utils/firebase/items'
import { Item } from '../types/item'

export function getItem(id: string): Item {
  const { data, error } = useSWR(id, get)
  if (error) {
    throw new Error(error)
  }
  return data!
}
