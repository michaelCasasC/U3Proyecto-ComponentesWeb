import { Box, Typography, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function ErrorMessage({ message = 'Ocurrió un error', onRetry }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={300}>
      <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
      <Typography variant="h6" color="error.main" mt={2}>{message}</Typography>
      {onRetry && <Button variant="outlined" onClick={onRetry} sx={{ mt: 2 }}>Reintentar</Button>}
    </Box>
  )
}
