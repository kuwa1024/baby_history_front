import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import { collection, addDoc, getFirestore, Timestamp } from 'firebase/firestore'
import json from '../configs/timing.json'

async function addItem(
  name: string,
  value: string,
  datetime: string
): Promise<void> {
  const db = getFirestore()
  await addDoc(collection(db, 'items'), {
    name: name,
    value: value,
    datetime: Timestamp.fromDate(new Date(datetime)),
  })
}

const add: NextPage = () => {
  return
  for (var key in json) {
    console.log(
      json[key].name + ' : ' + json[key].value + ' : ' + json[key].datetime
    )

    addItem(json[key].name, json[key].value ?? '', json[key].datetime)
  }

  return <Container maxWidth="md">OK</Container>
}

export default add
