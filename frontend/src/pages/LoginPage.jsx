import { useState } from 'react'
import { Paper, Text, Anchor, Box, Alert, Divider, Button, Group, Badge } from '@mantine/core'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/forms/LoginForm'
import { useAuth } from '../context/AuthContext'
import { IconKey } from '@tabler/icons-react'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogin = async (email, password) => {
    const result = await login(email, password)
    if (result.success) navigate('/')
    else setError(result.error)
  }

  const handleQuickDemo = (email, pass) => {
    handleLogin(email, pass)
  }

  return (
    <Paper p={{ base: 'md', sm: 'lg' }} style={{ borderRadius: 32, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}>
      <Text ta="center" fw={800} size="xl" style={{ letterSpacing: '-0.01em', marginBottom: 8 }}>
        Bienvenido de nuevo
      </Text>
      <Text ta="center" c="dimmed" size="sm" mb="lg">
        Ingresa tus credenciales para acceder a MediCitas
      </Text>

      {error && <Alert color="red" mb="md" style={{ borderRadius: 20 }}>{error}</Alert>}

      <LoginForm onSubmit={handleLogin} />

      <Box ta="center" mt="lg">
        <Text size="sm" c="dimmed">
          ¿No tienes cuenta?{' '}
          <Anchor component={RouterLink} to="/register" fw={700} c="primary">
            Regístrate aquí
          </Anchor>
        </Text>
      </Box>

      <Divider my="lg" label={<Badge size="sm" style={{ fontWeight: 700, fontSize: '0.7rem' }}>ACCESO RÁPIDO DEMO</Badge>} labelPosition="center" />

      <Group gap="md" grow>
        <Button
          variant="outline"
          size="sm"
          leftSection={<IconKey size={16} />}
          onClick={() => handleQuickDemo('jefferson.mejia@gmail.com', 'admin123')}
          style={{ borderRadius: 20 }}
        >
          Demo Admin
        </Button>
        <Button
          variant="outline"
          size="sm"
          color="teal"
          leftSection={<IconKey size={16} />}
          onClick={() => handleQuickDemo('andrea.cedeno@gmail.com', '123456')}
          style={{ borderRadius: 20 }}
        >
          Demo Paciente
        </Button>
      </Group>
    </Paper>
  )
}
