import { Box, Grid, Typography, Paper, Avatar } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../context/AppointmentsContext'
import StatisticsCards from '../components/dashboard/StatisticsCards'
import Breadcrumb from '../components/common/Breadcrumb'
import AppointmentCard from '../components/appointments/AppointmentCard'

export default function DashboardPage() {
  const { user } = useAuth()
  const { appointments, cancelAppointment } = useAppointments()

  const userAppointments = appointments.filter(a => a.patientId === user?.id)
  const now = new Date()
  const upcoming = userAppointments.filter(a => new Date(a.date) >= now && a.status !== 'Cancelada' && a.status !== 'Finalizada')

  const stats = {
    scheduled: userAppointments.filter(a => a.status === 'Pendiente' || a.status === 'Confirmada').length,
    upcoming: upcoming.length,
    specialties: 7,
    availableDoctors: 18,
  }

  return (
    <Box>
      <Breadcrumb />
      <Typography variant="h4" fontWeight={700} mb={3}>Bienvenido, {user?.name?.split(' ')[0]}</Typography>
      <StatisticsCards stats={stats} />
      <Typography variant="h5" fontWeight={600} mt={4} mb={2}>Próximas Citas</Typography>
      {upcoming.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No tienes citas próximas</Typography>
        </Paper>
      ) : (
        upcoming.map(appt => <AppointmentCard key={appt.id} appointment={appt} onCancel={cancelAppointment} />)
      )}
    </Box>
  )
}
