import { useEffect, useState } from 'react'
import { SimpleGrid, Select, Box } from '@mantine/core'
import CustomTextField from '../common/CustomTextField'
import CustomButton from '../common/CustomButton'
import { IconCalendarEvent, IconClock, IconUser, IconStethoscope } from '@tabler/icons-react'

const timeSlots = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']

export default function AppointmentForm({ doctors, specialties, selectedDoctor, selectedDate, onSubmit }) {
  const [form, setForm] = useState({ doctorId: selectedDoctor?.id?.toString() || '', specialty: selectedDoctor?.specialty || '', date: '', time: '' })

  useEffect(() => {
    if (selectedDate) setForm(prev => ({ ...prev, date: selectedDate }))
  }, [selectedDate])

  const handleChange = (field, value) => {
    if (field === 'doctorId') {
      const doctor = doctors.find(d => d.id === Number(value))
      setForm(prev => ({ ...prev, doctorId: value, specialty: doctor?.specialty || '' }))
    } else {
      setForm(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doctor = doctors.find(d => d.id === Number(form.doctorId))
    await onSubmit({ ...form, doctorName: doctor?.name })
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        <Select
          label="Especialidad"
          placeholder="Seleccionar especialidad"
          value={form.specialty}
          onChange={(value) => setForm(prev => ({ ...prev, specialty: value || '' }))}
          leftSection={<IconStethoscope size={18} />}
          data={specialties.map(s => ({ value: s.name, label: s.name }))}
          clearable
        />
        <Select
          label="Médico"
          placeholder="Seleccionar médico"
          value={form.doctorId}
          onChange={(value) => handleChange('doctorId', value || '')}
          leftSection={<IconUser size={18} />}
          data={doctors.filter(d => !form.specialty || d.specialty === form.specialty).map(d => ({
            value: d.id.toString(),
            label: `${d.name} - ${d.specialty}`,
          }))}
          clearable
        />
        <CustomTextField
          type="date"
          label="Fecha"
          value={form.date}
          onChange={(e) => handleChange('date', e.target.value)}
          icon={IconCalendarEvent}
        />
        <Select
          label="Horario"
          placeholder="Seleccionar horario"
          value={form.time}
          onChange={(value) => handleChange('time', value || '')}
          leftSection={<IconClock size={18} />}
          data={timeSlots.map(t => ({ value: t, label: t }))}
          clearable
        />
        <SimpleGrid.Col span={2}>
          <CustomButton type="submit" fullWidth disabled={!form.doctorId || !form.date || !form.time}>
            Solicitar Cita
          </CustomButton>
        </SimpleGrid.Col>
      </SimpleGrid>
    </Box>
  )
}
