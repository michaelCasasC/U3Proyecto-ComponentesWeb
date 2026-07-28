import { Group, Text, Rating as MantineRating } from '@mantine/core'

export default function Rating({ value, showValue = true, size = 'sm' }) {
  return (
    <Group gap="xs" align="center">
      <MantineRating value={value} fractions={2} readOnly size={size} />
      {showValue && <Text fw={600} size="sm">{value}</Text>}
    </Group>
  )
}
