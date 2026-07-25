import { useState } from 'react'
import { Paper, Typography, Link, Box } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/forms/LoginForm'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogin = (email, password) => {
    const result = login(email, password)
    if (result.success) navigate('/')
    else setError(result.error)
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>Iniciar Sesión</Typography>
      {error && <Typography color="error" variant="body2" textAlign="center" mb={2}>{error}</Typography>}
      <LoginForm onSubmit={handleLogin} />
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          ¿No tienes cuenta?{' '}
          <Link component={RouterLink} to="/register" underline="hover">Regístrate</Link>
        </Typography>
      </Box>
      <Box mt={2} p={2} bgcolor="action.hover" borderRadius={2}>
        <Typography variant="caption" color="text.secondary">
          <strong>Demo:</strong> admin@medicitas.com / admin123 (Admin) | juan@example.com / 123456 (Paciente)
        </Typography>
      </Box>
    </Paper>
  )
}
