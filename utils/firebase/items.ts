import { collection, getDocs, getFirestore, Timestamp } from 'firebase/firestore'

export type Item = {
  id: string
  name: string
  value: string
  datetime: Timestamp
}

export async function getItems(): Promise<Item[]> {
  const items = new Array<Item>()
  const db = getFirestore()
  const snapshot = await getDocs(collection(db, '/items'))

  snapshot.forEach((doc) => {
    const item = doc.data() as Item
    items.push({ ...item, id: doc.id })
  })

  return items
}
