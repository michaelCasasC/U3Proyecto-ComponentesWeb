import { useState } from 'react'
import { Paper, Text, Anchor, Box, Alert } from '@mantine/core'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import RegisterForm from '../components/forms/RegisterForm'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (name, email, password) => {
    const result = await register(name, email, password)
    if (result.success) { setSuccess(true); setTimeout(() => navigate('/login'), 2000) }
    else setError(result.error)
  }

  return (
    <Paper p="lg" style={{ borderRadius: 32 }}>
      <Text ta="center" fw={700} size="xl" mb="lg">Crear Cuenta</Text>
      {error && <Alert color="red" mb="md" style={{ borderRadius: 20 }}>{error}</Alert>}
      {success && <Alert color="green" mb="md" style={{ borderRadius: 20 }}>Registro exitoso. Redirigiendo al inicio de sesión...</Alert>}
      {!success && <RegisterForm onSubmit={handleRegister} />}
      <Box ta="center" mt="md">
        <Text size="sm">
          ¿Ya tienes cuenta?{' '}
          <Anchor component={RouterLink} to="/login" underline="hover">Inicia Sesión</Anchor>
        </Text>
      </Box>
    </Paper>
  )
}
