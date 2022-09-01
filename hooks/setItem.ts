import { Item, CreateItem, addItem } from '../utils/firebase/items'

export function setItem(name: string, value: string): void {
  const item: CreateItem = {
    name: name,
    value: value,
  }
  addItem(item)
}
