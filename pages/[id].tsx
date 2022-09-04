import { useState } from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import { ItemEdit } from '../components/ItemEdit'

const Edit: NextPage = () => {
  const [event, setEvent] = useState(Math.random())

  return (
    <Container maxWidth="md">
      <ItemEdit event={event} setEvent={setEvent} />
    </Container>
  )
}

export default Edit
