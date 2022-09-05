import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  setDoc,
  startAfter,
  query,
  where,
} from 'firebase/firestore'
import { CreateItem, Item } from '../../types/item'

const collection_name = process.env.NEXT_PUBLIC_FIRESTORE_COLLECTION as string

type ItemList = {
  items: Item[]
  next: string | null
}

export async function gets(
  event?: string,
  name?: string,
  cursor?: string
): Promise<ItemList> {
  const items = new Array<Item>()
  const db = getFirestore()
  const ref = collection(db, collection_name)

  const queryConstraints = new Array()
  if (name) {
    queryConstraints.push(where('name', '==', name))
  }
  queryConstraints.push(orderBy('datetime', 'desc'))
  queryConstraints.push(limit(20))
  if (cursor) {
    const lastVisible = await getDoc(doc(db, collection_name, cursor))
    queryConstraints.push(startAfter(lastVisible))
  }
  const q = query(ref, ...queryConstraints)

  const snapshot = await getDocs(q)
  snapshot.forEach((doc) => {
    const item = doc.data() as Item
    items.push({ ...item, id: doc.id })
  })

  const next = items.length > 0 ? items[items.length - 1].id : null
  return { items: items, next: next }
}

export async function add(item: CreateItem): Promise<void> {
  const db = getFirestore()
  await addDoc(collection(db, collection_name), {
    name: item.name,
    value: item.value,
    datetime: new Date(),
  })
}

export async function get(id: string): Promise<Item> {
  const db = getFirestore()
  const docSnap = await getDoc(doc(db, collection_name, id))
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: id } as Item
  } else {
    throw new Error('Item is not found')
  }
}

export async function set(item: Item): Promise<void> {
  const db = getFirestore()
  await setDoc(doc(db, collection_name, item.id), {
    name: item.name,
    value: item.value,
    datetime: item.datetime,
  })
}

export async function del(id: string): Promise<void> {
  const db = getFirestore()
  await deleteDoc(doc(db, collection_name, id))
}
