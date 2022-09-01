import { useEffect, useState } from 'react'
import { Value, getValues } from '../utils/common/value'

export type UseValuesOutput = {
  values: Value[]
}

const DEFAULT_OUTPUT: UseValuesOutput = {
  values: [],
}

export function useValues(key: string = ''): UseValuesOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT)

  useEffect(() => {
    void (() => {
      const { values } = getValues(key)
      setOutput({ values })
    })()
  }, [key])

  return output
}
