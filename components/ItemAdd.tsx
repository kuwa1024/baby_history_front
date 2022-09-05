import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Dropdown } from '../components/elements/Dropdown'
import { useNames } from '../hooks/useNames'
import { useValues } from '../hooks/useValues'
import { addItem } from '../hooks/addItem'
import { PropsEvent } from '../types/propsEvent'

export const ItemAdd: FC<PropsEvent> = ({ event, setEvent }) => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const { names } = useNames()
  const { values } = useValues(name)

  const handleClick = () => {
    const newValue = value == '選択' ? '' : value
    if (name == '') {
      setError(true)
      setHelperText('入力してください')
      return
    } else {
      setError(false)
      setHelperText('')
    }

    addItem(name, newValue)
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
        <Dropdown
          id="name"
          label="名称"
          value={name}
          setValue={setName}
          values={names}
          error={error}
          helperText={helperText}
        />
        <Dropdown
          id="value"
          label="内容"
          value={value}
          setValue={setValue}
          values={values}
        />
        <Button color="inherit" size="large" onClick={handleClick}>
          登録
        </Button>
      </Toolbar>
    </AppBar>
  )
}
