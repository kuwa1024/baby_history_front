import { FC, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddAlarmIcon from '@mui/icons-material/AddAlarm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Item, useItems } from '../hooks/useItems'
import { useNames } from '../hooks/useNames'
import { setAlarm } from '../hooks/editItem'
import { delItem } from '../hooks/delItem'
import { getFormattedDate } from '../utils/common/date'

type Props = {
  event: number
  setEvent: React.Dispatch<React.SetStateAction<number>>
}

export const ItemTable: FC<Props> = ({ event, setEvent }) => {
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [cursor, setCursor] = useState<string | null>()
  const [distanceBottom, setDistanceBottom] = useState(0)
  const { names } = useNames()
  const { items, next, isLoading } = useItems(event, name, cursor)
  const [rows, setRows] = useState<Item[]>([])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSearchClick = () => {
    setName(search)
  }

  const handleAlarmClick = async (e: string) => {
    await setAlarm(e)
    setEvent(Math.random())
  }

  const handleDeleteClick = (e: string) => {
    if (!window.confirm('削除してもよろしいですか？')) {
      return
    }
    delItem(e)
    setEvent(Math.random())
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

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
        <TextField
          id="search"
          select
          label="名称"
          defaultValue=""
          value={search}
          size="small"
          sx={{ '.MuiSelect-select': { background: '#fff' } }}
          onChange={handleSearchChange}
        >
          {names.map((name) => (
            <MenuItem key={name.name} value={name.name}>
              {name.name}
            </MenuItem>
          ))}
        </TextField>
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
              <StyledTableRow key={item.id}>
                <TableCell component="th" scope="row" align="center">
                  {getFormattedDate(item.datetime.toDate(), 'MM/dd hh:mm')}
                </TableCell>
                <TableCell>
                  {item.name}{' '}
                  {item.name.match(/母乳/) && item.value == '' ? (
                    <IconButton
                      aria-label="alarm"
                      size="small"
                      onClick={handleAlarmClick.bind(this, item.id)}
                    >
                      <AddAlarmIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    item.value
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    size="small"
                    href={`/${item.id}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={handleDeleteClick.bind(this, item.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <CircularProgress />}
      </TableContainer>
    </Box>
  )
}
