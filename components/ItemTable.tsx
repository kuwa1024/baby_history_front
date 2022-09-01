import { FC, useState, useMemo } from 'react'
import {
  Grid,
  Table,
  Dropdown,
  Button,
  Loading,
  useAsyncList,
} from '@nextui-org/react'
import { useItems } from '../hooks/useItems'
import { useNames } from '../hooks/useNames'
import { getFormattedDate } from '../utils/common/date'
import { Item, getItems } from '../utils/firebase/items'

export const ItemTable: FC = () => {
  const { names } = useNames()
  const [name, setName] = useState(new Set(['選択']))

  const selectedName = useMemo(
    () => Array.from(name).join(', ').replaceAll('_', ' '),
    [name]
  )
  async function load({ signal, cursor }) {
    console.log(signal)
    const { items, next } = await getItems(signal, cursor)
    return {
      items: items,
      cursor: next,
    }
  }

  const list = useAsyncList({ load })

  return (
    <>
      <Grid.Container gap={2}>
        <Grid>
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
        </Grid>
        <Grid>
          <Button>検索</Button>
        </Grid>
      </Grid.Container>
      <Table
        id="item_list"
        aria-label="list"
        css={{ minWidth: '100%', height: 'calc($space$14 * 10)' }}
      >
        <Table.Header>
          <Table.Column>日付</Table.Column>
          <Table.Column>名称</Table.Column>
          <Table.Column>内容</Table.Column>
          <Table.Column>操作</Table.Column>
        </Table.Header>
        <Table.Body
          items={list.items}
          loadingState={list.loadingState}
          onLoadMore={list.loadMore}
        >
          {(item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                {getFormattedDate(item.datetime.toDate(), 'yyyy/MM/dd hh:mm')}
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.value}</Table.Cell>
              <Table.Cell>編集 削除</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  )
}
