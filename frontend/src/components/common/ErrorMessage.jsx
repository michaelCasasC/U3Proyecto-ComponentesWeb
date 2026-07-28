import { Alert, Button, Text } from '@mantine/core'
import { IconError404 } from '@tabler/icons-react'

export default function ErrorMessage({ message = 'Ocurrió un error', onRetry }) {
  return (
    <Alert icon={<IconError404 size={24} />} color="red" variant="filled" style={{ minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Text size="lg" fw={600} mt="md">{message}</Text>
      {onRetry && <Button variant="outline" color="white" onClick={onRetry} mt="md">Reintentar</Button>}
    </Alert>
  )
}
