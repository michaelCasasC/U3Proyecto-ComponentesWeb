import { useState } from 'react'
import { Box, Text, ActionIcon, Paper, Group } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Calendar({ selectedDate, onDateSelect, appointments = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  })

  const getAppointmentsCount = (day) => appointments.filter(a => a.date === format(day, 'yyyy-MM-dd')).length

  return (
    <Paper p="md">
      <Group justify="space-between" mb="md">
        <ActionIcon variant="subtle" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <IconChevronLeft size={20} />
        </ActionIcon>
        <Text fw={600} size="lg">{format(currentMonth, 'MMMM yyyy', { locale: es })}</Text>
        <ActionIcon variant="subtle" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <IconChevronRight size={20} />
        </ActionIcon>
      </Group>
      <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => (
          <Text key={d} size="xs" ta="center" c="dimmed" fw={600}>
            {d}
          </Text>
        ))}
        {days.map(day => {
          const count = getAppointmentsCount(day)
          const isSelected = selectedDate && isSameDay(day, new Date(selectedDate))
          const sameMonth = isSameMonth(day, currentMonth)
          return (
            <Box
              key={day.toISOString()}
              onClick={() => sameMonth && onDateSelect(format(day, 'yyyy-MM-dd'))}
              style={{
                padding: 4,
                textAlign: 'center',
                cursor: sameMonth ? 'pointer' : 'default',
                backgroundColor: isSelected ? 'var(--mantine-color-primary-6)' : 'transparent',
                color: isSelected ? 'white' : isToday(day) ? 'var(--mantine-color-primary-6)' : sameMonth ? 'var(--mantine-color-text)' : 'var(--mantine-color-gray-5)',
                borderRadius: 8,
                fontWeight: isToday(day) ? 700 : 400,
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (sameMonth && !isSelected) {
                  e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-1)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <Text size="sm">{format(day, 'd')}</Text>
              {count > 0 && (
                <Text size="xs" style={{ position: 'absolute', top: 0, right: 2, color: 'var(--mantine-color-red-6)', fontWeight: 700 }}>{count}</Text>
              )}
            </Box>
          )
        })}
      </Box>
    </Paper>
  )
}
