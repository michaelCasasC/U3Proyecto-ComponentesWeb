import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Typography variant="h1" fontWeight={700} color="primary">404</Typography>
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'text.disabled', my: 2 }} />
      <Typography variant="h5" mb={1}>Página no encontrada</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>La página que buscas no existe o ha sido movida.</Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/')}>Volver al Inicio</Button>
    </Box>
  )
}
