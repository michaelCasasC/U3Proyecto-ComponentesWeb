import { useEffect, useState } from 'react'
import { SimpleGrid, Paper, Text, Title, Box } from '@mantine/core'
import { useLocation } from 'react-router-dom'
import { useAppointments } from '../context/AppointmentsContext'
import { useNotification } from '../context/NotificationContext'
import AppointmentForm from '../components/appointments/AppointmentForm'
import Calendar from '../components/appointments/Calendar'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import { api } from '../services/api'

export default function AppointmentsPage() {
  const location = useLocation()
  const { addAppointment } = useAppointments()
  const { showNotification } = useNotification()
  const [selectedDate, setSelectedDate] = useState(location.state?.date || '')
  const [doctors, setDoctors] = useState([])
  const [specialties, setSpecialties] = useState([])

  useEffect(() => {
    Promise.all([api.getDoctors(), api.getSpecialties()]).then(([doctorRows, specialtyRows]) => {
      setDoctors(doctorRows)
      setSpecialties(specialtyRows)
    })
  }, [])

  const handleSubmit = async (data) => {
    try {
      await addAppointment({ ...data, date: selectedDate || data.date })
      showNotification('Cita solicitada exitosamente', 'success')
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Agendar Cita" subtitle="Selecciona fecha, médico y horario para tu consulta" />
      <SimpleGrid cols={{ base: 1, md: 7, lg: 12 }} spacing="md">
        <Box style={{ gridColumn: 'span 7' }}>
          <Paper p="lg">
            <Title order={4} fw={600} mb="md">Datos de la Cita</Title>
            <AppointmentForm doctors={doctors} specialties={specialties} selectedDoctor={location.state?.doctor} selectedDate={selectedDate} onSubmit={handleSubmit} />
          </Paper>
        </Box>
        <Box style={{ gridColumn: 'span 5' }}>
          <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </Box>
      </SimpleGrid>
    </Box>
  )
}
