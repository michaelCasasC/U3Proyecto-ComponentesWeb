import { Box, Title, Text, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconError404 } from '@tabler/icons-react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Title order={1} fw={700} c="primary">404</Title>
      <IconError404 size={80} color="var(--mantine-color-gray-5)" style={{ margin: '16px 0' }} />
      <Title order={3} mb="xs">Página no encontrada</Title>
      <Text size="md" c="dimmed" mb="lg">La página que buscas no existe o ha sido movida.</Text>
      <Button size="lg" onClick={() => navigate('/')}>Volver al Inicio</Button>
    </Box>
  )
}
