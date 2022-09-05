import { Dispatch, SetStateAction } from 'react'

export type PropsEvent = {
  event: number
  setEvent: Dispatch<SetStateAction<number>>
}
