import { Box, Container, Typography } from '@mui/material'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'

export default function AuthLayout() {
  const { user } = useAuth()
  if (user) return <Navigate to="/" replace />
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Container maxWidth="sm">
        <Box textAlign="center" mb={4}>
          <LocalHospitalIcon sx={{ fontSize: 56, color: 'primary.main' }} />
          <Typography variant="h3" fontWeight={700} color="primary">MediCitas</Typography>
          <Typography variant="body1" color="text.secondary">Gestión de Citas Médicas</Typography>
        </Box>
        <Outlet />
      </Container>
    </Box>
  )
}
