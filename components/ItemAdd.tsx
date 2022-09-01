import { FC, useState, useMemo } from 'react'
import { Navbar, Dropdown, Button } from '@nextui-org/react'
import { useNames } from '../hooks/useNames'
import { useValues } from '../hooks/useValues'

export const ItemAdd: FC = () => {
  const [name, setName] = useState(new Set(['母乳']))
  const [value, setValue] = useState(new Set(['選択']))

  const selectedName = useMemo(
    () => Array.from(name).join(', ').replaceAll('_', ' '),
    [name]
  )

  const selectedValue = useMemo(
    () => Array.from(value).join(', ').replaceAll('_', ' '),
    [value]
  )

  const { names } = useNames()
  const { values } = useValues(selectedName)

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
              <Dropdown.Item key={value.name}>{value.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button auto>追加</Button>
      </Navbar.Content>
      <Navbar.Content></Navbar.Content>
    </Navbar>
  )
}
