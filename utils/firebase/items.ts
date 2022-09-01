import {
  collection,
  getDocs,
  addDoc,
  getFirestore,
  Timestamp,
  query,
  orderBy,
  startAfter,
  limit,
  doc,
  getDoc,
} from 'firebase/firestore'
import next from 'next'

export type CreateItem = {
  name: string
  value: string
}

export type Item = CreateItem & {
  id: string
  datetime: Timestamp
}

export type ItemList = {
  items: Item[]
  next: string | null
}

export async function getItems(
  name: string = '',
  cursor?: string
): Promise<ItemList> {
  const items = new Array<Item>()
  const db = getFirestore()
  const ref = collection(db, 'items')
  const queryConstraints = new Array()
  queryConstraints.push(orderBy('datetime', 'desc'))
  queryConstraints.push(limit(10))

  if (cursor) {
    const lastVisible = await getDoc(doc(db, 'items', cursor))
    queryConstraints.push(startAfter(lastVisible))
  }
  const q = query(ref, ...queryConstraints)
  const snapshot = await getDocs(q)
  snapshot.forEach((doc) => {
    const item = doc.data() as Item
    items.push({ ...item, id: doc.id })
  })

  const next = items.length > 0 ? items[items.length - 1].id : null;
  return { items: items, next: next }
}

export async function addItem(item: CreateItem): Promise<void> {
  const db = getFirestore()
  console.log(item)
  await addDoc(collection(db, 'items'), {
    name: item.name,
    value: item.value,
    datetime: new Date(),
  })
}
