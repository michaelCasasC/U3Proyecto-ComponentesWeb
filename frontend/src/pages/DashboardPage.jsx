import { useEffect, useState } from 'react'
import { Box, Typography, Paper, Button, useTheme } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../context/AppointmentsContext'
import StatisticsCards from '../components/dashboard/StatisticsCards'
import Breadcrumb from '../components/common/Breadcrumb'
import AppointmentCard from '../components/appointments/AppointmentCard'
import { api } from '../services/api'

export default function DashboardPage() {
  const { user } = useAuth()
  const { appointments, cancelAppointment } = useAppointments()
  const navigate = useNavigate()
  const theme = useTheme()
  const [catalogStats, setCatalogStats] = useState({ specialties: 0, availableDoctors: 0 })

  useEffect(() => {
    Promise.all([api.getSpecialties(), api.getDoctors()]).then(([specialties, doctors]) => {
      setCatalogStats({ specialties: specialties.length, availableDoctors: doctors.filter(doctor => doctor.available).length })
    })
  }, [])

  const userAppointments = appointments.filter(a => a.patientId === user?.id)
  const now = new Date()
  const upcoming = userAppointments.filter(a => new Date(a.date) >= now && a.status !== 'Cancelada' && a.status !== 'Finalizada')

  const stats = {
    scheduled: userAppointments.filter(a => a.status === 'Pendiente' || a.status === 'Confirmada').length,
    upcoming: upcoming.length,
    specialties: catalogStats.specialties,
    availableDoctors: catalogStats.availableDoctors,
  }

  return (
    <Box>
      <Breadcrumb />

      {/* Hero Welcome Banner */}
      <Paper sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(13, 148, 136, 0.2) 100%)'
          : 'linear-gradient(135deg, #1e40af 0%, #0d9488 100%)',
        color: '#ffffff',
        boxShadow: '0 10px 30px -5px rgba(37, 99, 235, 0.3)',
      }}>
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 650 }}>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.02em', mb: 1 }}>
            ¡Bienvenido de nuevo, {user?.name?.split(' ')[0]}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 3, lineHeight: 1.6 }}>
            Gestiona tus consultas médicas, agenda nuevas citas con nuestros especialistas y revisa tu historial clínico en un solo lugar.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<CalendarMonthIcon />}
              onClick={() => navigate('/appointments')}
              sx={{
                bgcolor: '#ffffff',
                color: '#1e40af',
                fontWeight: 700,
                px: 3,
                '&:hover': { bgcolor: '#f8fafc', color: '#1d4ed8' }
              }}
            >
              Agendar Nueva Cita
            </Button>
            <Button
              variant="outlined"
              startIcon={<MedicalServicesIcon />}
              onClick={() => navigate('/doctors')}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: '#ffffff',
                fontWeight: 600,
                px: 3,
                '&:hover': { borderColor: '#ffffff', bgcolor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Ver Médicos
            </Button>
          </Box>
        </Box>
      </Paper>

      <StatisticsCards stats={stats} />

      <Typography variant="h5" fontWeight={700} sx={{ mt: 4, mb: 2.5, letterSpacing: '-0.01em' }}>
        Próximas Citas Médicas
      </Typography>

      {upcoming.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 4, border: '1px dashed', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
            No tienes citas agendadas próximamente
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Puedes buscar especialistas por especialidad y reservar tu consulta en minutos.
          </Typography>
          <Button variant="contained" size="small" onClick={() => navigate('/appointments')}>
            Agendar una Cita Ahora
          </Button>
        </Paper>
      ) : (
        upcoming.map(appt => <AppointmentCard key={appt.id} appointment={appt} onCancel={cancelAppointment} />)
      )}
    </Box>
  )
}
