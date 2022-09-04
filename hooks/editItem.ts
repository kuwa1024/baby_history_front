import { Timestamp } from 'firebase/firestore'
import { Item, set, get } from '../utils/firebase/items'

export function editItem(
  id: string,
  name: string,
  value: string,
  datetime: Timestamp
): void {
  const item: Item = {
    id: id,
    name: name,
    value: value,
    datetime: datetime,
  }
  set(item)
}

export async function setAlarm(id: string): Promise<void> {
  const item = await get(id)
  const date1 = item.datetime.toDate()
  const date2 = new Date()
  const diff =
    Math.floor(date2.getTime() / (60 * 1000)) -
    Math.floor(date1.getTime() / (60 * 1000))
  const minutes = Math.floor(Math.abs(diff))

  const setitem: Item = {
    id: item.id,
    name: item.name,
    value: minutes.toString().concat('分'),
    datetime: item.datetime,
  }
  set(setitem)
}
