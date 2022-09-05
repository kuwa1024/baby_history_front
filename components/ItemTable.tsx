import { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { Dropdown } from '../components/elements/Dropdown'
import { ItemRow } from './elements/ItemRow'
import { useItems } from '../hooks/useItems'
import { useNames } from '../hooks/useNames'
import { PropsEvent } from '../types/propsEvent'
import { Item } from '../types/item'

export const ItemTable: FC<PropsEvent> = ({ event, setEvent }) => {
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [cursor, setCursor] = useState<string | null>()
  const [distanceBottom, setDistanceBottom] = useState(0)
  const { names } = useNames()
  const { items, next, isLoading } = useItems(event, name, cursor)
  const [rows, setRows] = useState<Item[]>([])

  const handleSearchClick = () => {
    setName(search)
  }

  useEffect(() => {
    void (() => {
      setRows(Array.from(new Set(rows.concat(items))))
    })()
  }, [items])

  useEffect(() => {
    void (() => {
      setCursor(null)
      setRows([])
    })()
  }, [event, name])

  const handleScroll = () => {
    let bottom = document.body.scrollHeight - window.innerHeight
    if (!distanceBottom) {
      setDistanceBottom(Math.round((bottom / 100) * 20))
    }
    if (window.pageYOffset > bottom - distanceBottom && next && !isLoading) {
      setCursor(next)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return (): void => document.removeEventListener('scroll', handleScroll)
  })

  return (
    <Box component="main">
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30%' },
          '& button': { m: 1 },
        }}
      >
        <Dropdown
          id="search"
          label="名称"
          value={search}
          setValue={setSearch}
          values={names}
        />
        <Button variant="contained" onClick={handleSearchClick}>
          検索
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">日付</TableCell>
              <TableCell>履歴</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <ItemRow item={item} event={event} setEvent={setEvent} />
            ))}
          </TableBody>
        </Table>
        {isLoading && <CircularProgress />}
      </TableContainer>
    </Box>
  )
}
