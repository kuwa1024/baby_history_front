import { FC } from 'react'
import { Grid, Table, Dropdown, Button } from '@nextui-org/react'
import { useItems } from '../hooks/useItems'
import { getFormattedDate } from '../utils/common/date'

export const ItemTable: FC = () => {
  const { isLoading, items } = useItems()
  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <Grid.Container gap={2}>
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
          <Button>検索</Button>
        </Grid>
      </Grid.Container>
      <Table>
        <Table.Header>
          <Table.Column>日付</Table.Column>
          <Table.Column>名称</Table.Column>
          <Table.Column>内容</Table.Column>
          <Table.Column>操作</Table.Column>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                {getFormattedDate(item.datetime.toDate(), 'yyyy/MM/dd hh:mm')}
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.value}</Table.Cell>
              <Table.Cell>編集 削除</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
