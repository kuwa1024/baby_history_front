import { useEffect, useState } from 'react'
import { Item, getItems } from '../utils/firebase/items'

export async function useItems(s: string = '', c: string = '') {
  const { items, next } = await getItems(s, c)
  return { items, next }
}
