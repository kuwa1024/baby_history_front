import { useEffect, useState } from 'react'
import { Value, getValues } from '../utils/common/value'

type UseValues = {
  values: Value[]
}

const init: UseValues = {
  values: [],
}

export function useValues(key: string = ''): UseValues {
  const [value, setValue] = useState(init)

  useEffect(() => {
    void (() => {
      const { values } = getValues(key)
      setValue({ values })
    })()
  }, [key])

  return value
}
