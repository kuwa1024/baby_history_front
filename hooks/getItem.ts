import useSWR from 'swr'
import { Item as I, get } from '../utils/firebase/items'

export type Item = I

export function getItem(id: string): Item {
  const { data, error } = useSWR(id, get)
  if (error) {
    throw new Error(error)
  }

  return data!
}
