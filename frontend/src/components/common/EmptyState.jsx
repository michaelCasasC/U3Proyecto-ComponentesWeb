import { Box, Text } from '@mantine/core'
import { IconInbox } from '@tabler/icons-react'

export default function EmptyState({ message = 'No hay datos disponibles', icon: Icon = IconInbox }) {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <Icon size={64} color="var(--mantine-color-gray-5)" />
      <Text c="dimmed" size="lg" mt="md">{message}</Text>
    </Box>
  )
}
