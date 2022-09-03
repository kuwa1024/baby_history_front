import { del } from '../utils/firebase/items'

export function delItem(id: string): void {
  del(id)
}
