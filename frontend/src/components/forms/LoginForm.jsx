import { useState } from 'react'
import { Box } from '@mantine/core'
import CustomTextField from '../common/CustomTextField'
import CustomButton from '../common/CustomButton'
import { IconMail, IconLock } from '@tabler/icons-react'

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
      <CustomTextField label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={IconMail} required />
      <CustomTextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={IconLock} required />
      <CustomButton type="submit" fullWidth loading={loading}>Iniciar Sesión</CustomButton>
    </Box>
  )
}
