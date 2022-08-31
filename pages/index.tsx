import type { NextPage } from 'next'
import { Container } from '@nextui-org/react'
import { getApp, FirebaseApp } from 'firebase/app'
import { ItemAdd } from '../components/ItemAdd'
import { ItemTable } from '../components/ItemTable'

const Home: NextPage = () => {
  const app: FirebaseApp = getApp()
  return (
    <Container sm>
      <ItemAdd />
      <ItemTable />
    </Container>
  )
}

export default Home
