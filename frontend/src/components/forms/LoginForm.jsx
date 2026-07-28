import { useState } from 'react'
import { Box } from '@mui/material'
import CustomTextField from '../common/CustomTextField'
import CustomButton from '../common/CustomButton'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    await onSubmit(email, password)
    setLoading(false)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <CustomTextField label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={EmailIcon} required />
      <CustomTextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={LockIcon} required />
      <CustomButton type="submit" fullWidth loading={loading}>Iniciar Sesión</CustomButton>
    </Box>
  )
}
