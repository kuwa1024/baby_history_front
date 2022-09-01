import { useEffect, useState } from 'react'
import { Name, getNames } from '../utils/common/name'

export type UseNamesOutput = {
  names: Name[]
}

const DEFAULT_OUTPUT: UseNamesOutput = {
  names: [],
}

export function useNames(): UseNamesOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT)

  useEffect(() => {
    void (() => {
      const {names} = getNames()
      setOutput({ names })
    })()
  }, [])

  return output
}
