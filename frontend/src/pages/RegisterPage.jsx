import { useState } from 'react'
import { Paper, Typography, Link, Box, Alert } from '@mui/material'
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
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>Crear Cuenta</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Registro exitoso. Redirigiendo al inicio de sesión...</Alert>}
      {!success && <RegisterForm onSubmit={handleRegister} />}
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          ¿Ya tienes cuenta?{' '}
          <Link component={RouterLink} to="/login" underline="hover">Inicia Sesión</Link>
        </Typography>
      </Box>
    </Paper>
  )
}
