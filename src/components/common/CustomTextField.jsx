import { TextField } from '@mui/material'

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
          startAdornment: Icon ? <Icon sx={{ mr: 1, color: 'action.active' }} /> : undefined,
        },
      }}
      sx={{ mb: 2 }}
      {...props}
    />
  )
}
