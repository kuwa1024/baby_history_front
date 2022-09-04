import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { Timestamp } from 'firebase/firestore'
import { useNames } from '../hooks/useNames'
import { useValues } from '../hooks/useValues'
import { getItem } from '../hooks/getItem'
import { editItem } from '../hooks/editItem'
import { getFormattedDate } from '../utils/common/date'

type Props = {
  event: number
  setEvent: React.Dispatch<React.SetStateAction<number>>
}

export const ItemEdit: FC<Props> = ({ event, setEvent }) => {
  const router = useRouter()
  const { id } = router.query
  const item = getItem(id as string)
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [datetime, setDatetime] = useState('')
  const [inputError, setInputError] = useState(false)
  const [inputErrorMessage, setInputErrorMessage] = useState('')

  useEffect(() => {
    void (() => {
      if (item) {
        setName(item.name)
        setValue(item.value)
        setDatetime(
          getFormattedDate(item.datetime.toDate(), 'yyyy-MM-ddThh:mm')
        )
      }
    })()
  }, [item])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleDatetimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDatetime(event.target.value)
  }

  const { names } = useNames()
  const { values } = useValues(name)

  const handleClick = () => {
    const new_value = value == '選択' ? '' : value
    if (name == '') {
      setInputError(true)
      setInputErrorMessage('入力してください')
      return
    } else {
      setInputError(false)
      setInputErrorMessage('')
    }

    editItem(item.id, name, value, Timestamp.fromDate(new Date(datetime)))
    setEvent(Math.random())
    router.push('/')
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
    >
      <div>
        <Button variant="contained" href="/">
          戻る
        </Button>
      </div>
      <div>
        <TextField
          id="datetime-local"
          label="日付"
          type="datetime-local"
          value={datetime}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDatetimeChange}
        />
      </div>
      <div>
        <TextField
          id="name"
          select
          label="名称"
          error={inputError}
          helperText={inputErrorMessage}
          defaultValue=""
          value={name}
          size="small"
          onChange={handleNameChange}
        >
          {names.map((name) => (
            <MenuItem key={name.name} value={name.name}>
              {name.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          id="value"
          select
          label="内容"
          defaultValue=""
          value={value}
          size="small"
          onChange={handleValueChange}
        >
          {values.map((value) => (
            <MenuItem key={value.name} value={value.name}>
              {value.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <Button size="large" variant="contained" onClick={handleClick}>
          変更
        </Button>
      </div>
    </Box>
  )
}
