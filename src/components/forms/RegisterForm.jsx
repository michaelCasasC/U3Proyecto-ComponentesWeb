import { useState } from 'react'
import { Box } from '@mui/material'
import CustomTextField from '../common/CustomTextField'
import CustomButton from '../common/CustomButton'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'

export default function RegisterForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); return }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }
    setError('')
    await new Promise(r => setTimeout(r, 500))
    onSubmit(name, email, password)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <CustomTextField label="Nombre Completo" value={name} onChange={(e) => setName(e.target.value)} icon={PersonIcon} required />
      <CustomTextField label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={EmailIcon} required />
      <CustomTextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={LockIcon} required error={!!error} helperText={error} />
      <CustomTextField label="Confirmar Contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={LockIcon} required />
      <CustomButton type="submit" fullWidth>Crear Cuenta</CustomButton>
    </Box>
  )
}
