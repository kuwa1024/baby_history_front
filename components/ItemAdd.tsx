import { FC, useState, useMemo } from 'react'
import { Navbar, Dropdown, Button } from '@nextui-org/react'
import { useNames } from '../hooks/useNames'
import { useValues } from '../hooks/useValues'
import { setItem } from '../hooks/setItem'

export const ItemAdd: FC = () => {
  const [name, setName] = useState(new Set(['母乳']))
  const [value, setValue] = useState(new Set(['']))

  const selectedName = useMemo(
    () => Array.from(name).join(', ').replaceAll('_', ' '),
    [name]
  )

  const { names } = useNames()
  const { values } = useValues(selectedName)

  const selectedValue = useMemo(() => {
    const str = Array.from(value).join(', ').replaceAll('_', ' ')
    const obj = values.find((v) => v.key == str)
    return obj?.name ?? values[0]?.name
  }, [value, values])

  const handleClick = () => {
    setItem(selectedName, Array.from(value).join(', ').replaceAll('_', ' '))
  }

  return (
    <Navbar isCompact variant="sticky">
      <Navbar.Brand></Navbar.Brand>
      <Navbar.Content>
        <Dropdown>
          <Dropdown.Button flat id="name">
            {selectedName}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="name"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={name}
            onSelectionChange={setName}
          >
            {names.map((name) => (
              <Dropdown.Item key={name.name}>{name.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button flat id="value">
            {selectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="value"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={value}
            onSelectionChange={setValue}
          >
            {values.map((value) => (
              <Dropdown.Item key={value.key}>{value.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button auto onPress={handleClick}>
          追加
        </Button>
      </Navbar.Content>
      <Navbar.Content></Navbar.Content>
    </Navbar>
  )
}
