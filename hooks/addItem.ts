import { CreateItem, add } from '../utils/firebase/items'

export function addItem(name: string, value: string): void {
  const item: CreateItem = {
    name: name,
    value: value,
  }
  add(item)
}
