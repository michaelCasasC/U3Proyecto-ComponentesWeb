import { useState } from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useAppointments } from '../context/AppointmentsContext'
import { useNotification } from '../context/NotificationContext'
import AppointmentForm from '../components/appointments/AppointmentForm'
import Calendar from '../components/appointments/Calendar'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import { doctors, specialties } from '../services/api'

export default function AppointmentsPage() {
  const location = useLocation()
  const { addAppointment } = useAppointments()
  const { showNotification } = useNotification()
  const [selectedDate, setSelectedDate] = useState(location.state?.date || '')

  const handleSubmit = (data) => {
    addAppointment({ ...data, date: selectedDate || data.date })
    showNotification('Cita solicitada exitosamente', 'success')
  }

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Agendar Cita" subtitle="Selecciona fecha, médico y horario para tu consulta" />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Datos de la Cita</Typography>
            <AppointmentForm doctors={doctors} specialties={specialties} selectedDoctor={location.state?.doctor} onSubmit={handleSubmit} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </Grid>
      </Grid>
    </Box>
  )
}
