import { Card, Text, Group, Box } from '@mantine/core'

export default function DashboardCards({ title, value, icon: Icon, color = '#2563eb', subtitle }) {
  return (
    <Card
      padding="lg"
      style={{
        height: '100%',
        border: '1px solid var(--mantine-color-gray-3)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 25px rgba(37,99,235,0.1)',
          },
        },
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Box style={{ flexGrow: 1 }}>
          <Text size="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.02em', marginBottom: 8 }}>
            {title}
          </Text>
          <Text fw={800} size="xl" style={{ letterSpacing: '-0.02em', margin: '4px 0' }}>
            {value}
          </Text>
          {subtitle && (
            <Text size="sm" c="dimmed" fw={500} mt={5}>
              {subtitle}
            </Text>
          )}
        </Box>
        <Box
          style={{
            width: 54,
            height: 54,
            borderRadius: 28,
            backgroundColor: `${color}15`,
            border: `1px solid ${color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 6px 16px -2px ${color}20`,
            flexShrink: 0,
          }}
        >
          <Icon size={30} color={color} />
        </Box>
      </Group>
    </Card>
  )
}
