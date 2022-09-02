import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { useNames } from '../hooks/useNames'
import { useValues } from '../hooks/useValues'
import { setItem } from '../hooks/setItem'

type Props = {
  event: number
  setEvent: React.Dispatch<React.SetStateAction<number>>
}

export const ItemAdd: FC<Props> = ({event, setEvent}) => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
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

    setItem(name, new_value)
    setName('')
    setValue('')
    setEvent(Math.random())
    router.push('/')
  }

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          '& .MuiTextField-root': { width: '30%' },
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          履歴
        </Typography>
        <TextField
          id="name"
          select
          label="名称"
          error={inputError}
          helperText={inputErrorMessage}
          defaultValue=""
          value={name}
          size="small"
          sx={{ '.MuiSelect-select': { background: '#fff' } }}
          onChange={handleChangeName}
        >
          {names.map((name) => (
            <MenuItem key={name.name} value={name.name}>
              {name.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="value"
          select
          label="内容"
          defaultValue=""
          value={value}
          size="small"
          sx={{ '.MuiSelect-select': { background: '#fff' } }}
          onChange={handleChangeValue}
        >
          {values.map((value) => (
            <MenuItem key={value.name} value={value.name}>
              {value.name}
            </MenuItem>
          ))}
        </TextField>
        <Button color="inherit" size="large" onClick={handleClick}>
          登録
        </Button>
      </Toolbar>
    </AppBar>
  )
}
