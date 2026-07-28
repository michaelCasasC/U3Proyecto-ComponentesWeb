import { Container, Text, Title, Box } from '@mantine/core'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthLayout() {
  const { user } = useAuth()

  if (user) return <Navigate to="/" replace />

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 0',
        background: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.08) 0%, rgba(248, 250, 252, 1) 70%)',
      }}
    >
      <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Box style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            src="/android-chrome-192x192.png"
            alt="MediCitas Logo"
            style={{
              width: 80,
              height: 80,
              marginBottom: '12px',
              borderRadius: '28px',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.25)',
            }}
          />
          <Title
            order={1}
            style={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MediCitas
          </Title>
          <Text c="dimmed" size="md" fw={500} mt={4}>
            Gestión inteligente de citas médicas
          </Text>
        </Box>
        <Outlet />
      </Container>
    </Box>
  )
}
