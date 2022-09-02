import * as React from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import { ItemAdd } from '../components/ItemAdd'
import { ItemTable } from '../components/ItemTable'

const Home: NextPage = () => {
  return (
    <Container maxWidth="md">
      <ItemAdd />
      <ItemTable />
    </Container>
  )
}

export default Home
