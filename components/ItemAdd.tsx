import { FC } from 'react'
import { Grid, Text, Link, Dropdown, Button } from '@nextui-org/react'

export const ItemAdd: FC = () => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid>
      <Text h1 size="$xl">
        <Link href="/">履歴</Link>
      </Text>
      </Grid>
      <Grid>
        <Dropdown>
          <Dropdown.Button flat>Trigger</Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="new">New file</Dropdown.Item>
            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
            <Dropdown.Item key="delete" color="error">
              Delete file
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
      <Grid>
        <Dropdown>
          <Dropdown.Button flat>Trigger</Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="new">New file</Dropdown.Item>
            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
            <Dropdown.Item key="delete" color="error">
              Delete file
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
      <Grid>
        <Button>追加</Button>
      </Grid>
    </Grid.Container>
  )
}
