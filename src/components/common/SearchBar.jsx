import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar({ value, onChange, placeholder = 'Buscar...', ...props }) {
  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
      }}
      sx={{ maxWidth: 400 }}
      {...props}
    />
  )
}
