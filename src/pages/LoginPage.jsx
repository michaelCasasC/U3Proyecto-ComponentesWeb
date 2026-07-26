import { useState } from 'react'
import { Paper, Typography, Link, Box, Alert, Chip, Divider, Button } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/forms/LoginForm'
import { useAuth } from '../context/AuthContext'
import KeyIcon from '@mui/icons-material/Key'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogin = (email, password) => {
    const result = login(email, password)
    if (result.success) navigate('/')
    else setError(result.error)
  }

  const handleQuickDemo = (email, pass) => {
    handleLogin(email, pass)
  }

  return (
    <Paper sx={{ p: { xs: 3, sm: 4 }, borderRadius: 4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}>
      <Typography variant="h5" fontWeight={800} textAlign="center" sx={{ letterSpacing: '-0.01em', mb: 1 }}>
        Bienvenido de nuevo
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
        Ingresa tus credenciales para acceder a MediCitas
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2.5 }}>{error}</Alert>}

      <LoginForm onSubmit={handleLogin} />

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          ¿No tienes cuenta?{' '}
          <Link component={RouterLink} to="/register" underline="hover" fontWeight={700} color="primary">
            Regístrate aquí
          </Link>
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }}>
        <Chip label="ACCESO RÁPIDO DEMO" size="small" sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
      </Divider>

      <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<KeyIcon fontSize="small" />}
          onClick={() => handleQuickDemo('admin@medicitas.com', 'admin123')}
          sx={{ borderRadius: 2.5, py: 1 }}
        >
          Demo Admin
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<KeyIcon fontSize="small" />}
          onClick={() => handleQuickDemo('juan@example.com', '123456')}
          sx={{ borderRadius: 2.5, py: 1 }}
        >
          Demo Paciente
        </Button>
      </Box>
    </Paper>
  )
}
