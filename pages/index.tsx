import type { NextPage } from 'next'
import { getApp, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { ItemTable } from '../components/ItemTable'

const firestore: Firestore = getFirestore()

const Home: NextPage = () => {
  const app: FirebaseApp = getApp()
  return (
    <ItemTable />
  )
}

export default Home
