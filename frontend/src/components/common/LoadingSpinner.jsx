import { Box, Loader, Text } from '@mantine/core'

export default function LoadingSpinner({ message = 'Cargando...' }) {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <Loader size={48} />
      <Text size="sm" c="dimmed" mt="md">{message}</Text>
    </Box>
  )
}
