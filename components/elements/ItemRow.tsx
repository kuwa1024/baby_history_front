import { FC } from 'react'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import AddAlarmIcon from '@mui/icons-material/AddAlarm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { getFormattedDate } from '../../utils/common/date'
import { setAlarm } from '../../hooks/editItem'
import { delItem } from '../../hooks/delItem'
import { PropsEvent } from '../../types/propsEvent'
import { Item } from '../../types/item'

type Props = PropsEvent & {
  item: Item
}

export const ItemRow: FC<Props> = ({ item, event, setEvent }) => {
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  return (
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
        <IconButton aria-label="edit" size="small" href={`/${item.id}`}>
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
  )
}
