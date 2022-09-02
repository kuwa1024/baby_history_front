import { FC, useState } from 'react'
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
import { useItems } from '../hooks/useItems'
import { useNames } from '../hooks/useNames'
import { getFormattedDate } from '../utils/common/date'

type Props = {
  event: number
  setEvent: React.Dispatch<React.SetStateAction<number>>
}

export const ItemTable: FC<Props> = ({event, setEvent}) => {
  const [search, setSearch] = useState('')

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const { names } = useNames()
  const { isLoading, items } = useItems(event)

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  if (isLoading) return <CircularProgress />

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
          onChange={handleChangeSearch}
        >
          {names.map((name) => (
            <MenuItem key={name.name} value={name.name}>
              {name.name}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained">検索</Button>
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
            {items.map((item) => (
              <StyledTableRow key={item.id}>
                <TableCell component="th" scope="row" align="center">
                  {getFormattedDate(item.datetime.toDate(), 'MM/dd hh:mm')}
                </TableCell>
                <TableCell>
                  {item.name} {item.value}
                </TableCell>
                <TableCell align="center">編集 削除</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
