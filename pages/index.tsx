import { useState } from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import { ItemAdd } from '../components/ItemAdd'
import { ItemTable } from '../components/ItemTable'

const Home: NextPage = () => {
  const [event, setEvent] = useState(performance.now())

  return (
    <Container maxWidth="md">
      <ItemAdd event={event} setEvent={setEvent} />
      <ItemTable event={event} setEvent={setEvent} />
    </Container>
  )
}

export default Home
