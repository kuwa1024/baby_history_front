import { Timestamp } from 'firebase/firestore'

export type CreateItem = {
  name: string
  value: string
}

export type Item = {
  id: string
  name: string
  value: string
  datetime: Timestamp
}
