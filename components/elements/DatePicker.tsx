import { FC } from 'react'
import TextField from '@mui/material/TextField'

type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const DatePicker: FC<Props> = ({ value, setValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <TextField
      id="datetime-local"
      label="日付"
      type="datetime-local"
      value={value}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleChange}
    />
  )
}
