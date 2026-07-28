import { Group, Box, Text, Title } from '@mantine/core'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <Group justify="space-between" align="center" mb="md" wrap="wrap">
      <Box>
        <Title order={2} fw={700}>{title}</Title>
        {subtitle && <Text size="sm" c="dimmed" mt={4}>{subtitle}</Text>}
      </Box>
      {action && <Box>{action}</Box>}
    </Group>
  )
}
