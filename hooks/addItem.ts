import { add } from '../utils/firebase/items'
import { CreateItem } from '../types/item'

export function addItem(name: string, value: string): void {
  const item: CreateItem = {
    name: name,
    value: value,
  }
  add(item)
}
