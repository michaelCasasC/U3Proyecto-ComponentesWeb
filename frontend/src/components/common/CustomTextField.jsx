import { TextField, InputAdornment } from '@mui/material'

export default function CustomTextField({ label, icon: Icon, error, helperText, slotProps: externalSlotProps, ...props }) {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      error={error}
      helperText={helperText}
      slotProps={{
        ...externalSlotProps,
        input: {
          ...externalSlotProps?.input,
          startAdornment: Icon ? (
            <InputAdornment position="start">
              <Icon sx={{ color: 'action.active' }} />
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{ mb: 2 }}
      {...props}
    />
  )
}
