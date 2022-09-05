import { useEffect, useState } from 'react'
import { Name, getNames } from '../utils/common/name'

type UseNames = {
  names: Name[]
}

const init: UseNames = {
  names: [],
}

export function useNames(): UseNames {
  const [value, setValue] = useState(init)

  useEffect(() => {
    void (() => {
      const { names } = getNames()
      setValue({ names })
    })()
  }, [])

  return value
}
