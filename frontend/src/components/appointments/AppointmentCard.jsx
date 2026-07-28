import { Card, Text, Group, Box, Button } from '@mantine/core'
import { IconCalendarEvent, IconClock, IconUser, IconStethoscope } from '@tabler/icons-react'
import ChipStatus from '../common/ChipStatus'

export default function AppointmentCard({ appointment, onCancel }) {
  return (
    <Card
      padding="lg"
      mb="md"
      style={{
        border: '1px solid var(--mantine-color-gray-3)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(37,99,235,0.08)',
            borderColor: 'rgba(37, 99, 235, 0.25)',
          },
        },
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
        <Group gap="md" align="flex-start" wrap="nowrap">
          <Box
            style={{
              width: 52,
              height: 52,
              borderRadius: 24,
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
              color: 'var(--mantine-color-primary-6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <IconStethoscope size={26} />
          </Box>

          <Box>
            <Text fw={700} size="lg" style={{ letterSpacing: '-0.01em' }}>
              {appointment.doctorName}
            </Text>
            <Text size="sm" c="dimmed" fw={500} mb="sm">
              {appointment.specialty}
            </Text>

            <Group gap="md" wrap="wrap">
              <Group gap={6} p="xs" style={{ backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 16 }}>
                <IconCalendarEvent size={16} color="var(--mantine-color-primary-6)" />
                <Text size="sm" fw={600}>{appointment.date}</Text>
              </Group>
              <Group gap={6} p="xs" style={{ backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 16 }}>
                <IconClock size={16} color="var(--mantine-color-primary-6)" />
                <Text size="sm" fw={600}>{appointment.time}</Text>
              </Group>
              <Group gap={6}>
                <IconUser size={16} color="var(--mantine-color-gray-6)" />
                <Text size="sm" c="dimmed">{appointment.patientName}</Text>
              </Group>
            </Group>
          </Box>
        </Group>

        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
          <ChipStatus status={appointment.status} />
          {appointment.status === 'Pendiente' && (
            <Button size="sm" color="red" variant="outline" onClick={() => onCancel(appointment.id)} style={{ borderRadius: 16 }}>
              Cancelar Cita
            </Button>
          )}
        </Box>
      </Group>
    </Card>
  )
}
