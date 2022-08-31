import { FC } from 'react'
import { useItems } from '../hooks/useItems'

export const ItemTable: FC = () => {
  const { isLoading, items } = useItems()
  if (isLoading) return <p>Loading...</p>

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} / {item.value} / {item.datetime.toDate().toString()}
        </li>
      ))}
    </ul>
  )
}
