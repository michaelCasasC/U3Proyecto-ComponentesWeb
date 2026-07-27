import { Box, Container, Typography, useTheme } from '@mui/material'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthLayout() {
  const { user } = useAuth()
  const theme = useTheme()

  if (user) return <Navigate to="/" replace />

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      py: 6,
      background: theme.palette.mode === 'dark'
        ? 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.15) 0%, rgba(11, 15, 25, 1) 70%)'
        : 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.08) 0%, rgba(248, 250, 252, 1) 70%)',
    }}>
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            component="img"
            src="/android-chrome-192x192.png"
            alt="MediCitas Logo"
            sx={{
              width: 80,
              height: 80,
              mb: 1.5,
              borderRadius: 3.5,
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.25)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          />
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MediCitas
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={500} sx={{ mt: 0.5 }}>
            Gestión inteligente de citas médicas
          </Typography>
        </Box>
        <Outlet />
      </Container>
    </Box>
  )
}
