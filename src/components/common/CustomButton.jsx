import { Button, CircularProgress } from '@mui/material'

export default function CustomButton({ children, loading, icon: Icon, variant = 'contained', color = 'primary', ...props }) {
  return (
    <Button
      variant={variant}
      color={color}
      disabled={loading}
      startIcon={Icon && !loading ? <Icon /> : null}
      sx={{ minWidth: 120, py: 1.2 }}
      {...props}
    >
      {loading ? <CircularProgress size={22} color="inherit" /> : children}
    </Button>
  )
}
