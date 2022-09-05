import { FC } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

type Props = {
  id: string
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  values: any[]
  error?: boolean
  helperText?: string
}

export const Dropdown: FC<Props> = ({
  id,
  label,
  error,
  setValue,
  values,
  helperText,
  value,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <TextField
      id={id}
      select
      label={label}
      error={error}
      helperText={helperText}
      defaultValue=""
      value={value}
      size="small"
      sx={{ '.MuiSelect-select': { background: '#fff' } }}
      onChange={handleChange}
    >
      {values.map((value) => (
        <MenuItem key={value.name} value={value.name}>
          {value.name}
        </MenuItem>
      ))}
    </TextField>
  )
}
