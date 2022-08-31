import { FC } from 'react'
import { Navbar, Text, Link, Dropdown, Button } from '@nextui-org/react'

export const ItemAdd: FC = () => {
  return (
    <Navbar isCompact variant="sticky">
      <Navbar.Content>
        <Dropdown>
          <Dropdown.Button flat>選択</Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="new">New file</Dropdown.Item>
            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
            <Dropdown.Item key="delete" color="error">
              Delete file
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button flat>選択</Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="new">New file</Dropdown.Item>
            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
            <Dropdown.Item key="delete" color="error">
              Delete file
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button auto>追加</Button>
      </Navbar.Content>
    </Navbar>
  )
}
