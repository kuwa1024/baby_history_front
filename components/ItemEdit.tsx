import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import { Timestamp } from 'firebase/firestore'
import { DatePicker } from '../components/elements/DatePicker'
import { Dropdown } from '../components/elements/Dropdown'
import { useNames } from '../hooks/useNames'
import { useValues } from '../hooks/useValues'
import { getItem } from '../hooks/getItem'
import { editItem } from '../hooks/editItem'
import { getFormattedDate } from '../utils/common/date'
import { PropsEvent } from '../types/propsEvent'

export const ItemEdit: FC<PropsEvent> = ({ event, setEvent }) => {
  const router = useRouter()
  const { id } = router.query
  const item = getItem(id as string)
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [datetime, setDatetime] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const { names } = useNames()
  const { values } = useValues(name)

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

  const handleClick = () => {
    const new_value = value == '選択' ? '' : value
    if (name == '') {
      setError(true)
      setHelperText('入力してください')
      return
    } else {
      setError(false)
      setHelperText('')
    }

    editItem(item.id, name, new_value, Timestamp.fromDate(new Date(datetime)))
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
        <DatePicker value={datetime} setValue={setDatetime} />
      </div>
      <div>
        <Dropdown
          id="name"
          label="名称"
          value={name}
          setValue={setName}
          values={names}
          error={error}
          helperText={helperText}
        />
      </div>
      <div>
        <Dropdown
          id="value"
          label="内容"
          value={value}
          setValue={setValue}
          values={values}
        />
      </div>
      <div>
        <Button size="large" variant="contained" onClick={handleClick}>
          変更
        </Button>
      </div>
    </Box>
  )
}
