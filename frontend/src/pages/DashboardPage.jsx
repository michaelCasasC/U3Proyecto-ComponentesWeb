import { useEffect, useState } from 'react'
import { Box, Paper, Button, Text, Title, Group } from '@mantine/core'
import { IconCalendarMonth, IconBuildingHospital } from '@tabler/icons-react'
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
  const [catalogStats, setCatalogStats] = useState({ specialties: 0, availableDoctors: 0 })
  const navigate = useNavigate()

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

      <Paper
        p={{ base: 'md', md: 'lg' }}
        mb="lg"
        style={{
          borderRadius: 32,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1e40af 0%, #0d9488 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 30px -5px rgba(37, 99, 235, 0.3)',
        }}
      >
        <Box style={{ position: 'relative', zIndex: 1, maxWidth: 650 }}>
          <Title order={2} fw={800} mb="xs" style={{ letterSpacing: '-0.02em' }}>
            ¡Bienvenido de nuevo, {user?.name?.split(' ')[0]}!
          </Title>
          <Text size="md" mb="lg" style={{ opacity: 0.9, lineHeight: 1.6 }}>
            Gestiona tus consultas médicas, agenda nuevas citas con nuestros especialistas y revisa tu historial clínico en un solo lugar.
          </Text>
          <Group gap="md">
            <Button
              leftSection={<IconCalendarMonth size={18} />}
              onClick={() => navigate('/appointments')}
              style={{
                backgroundColor: '#ffffff',
                color: '#1e40af',
                fontWeight: 700,
              }}
            >
              Agendar Nueva Cita
            </Button>
            <Button
              variant="outline"
              leftSection={<IconBuildingHospital size={18} />}
              onClick={() => navigate('/doctors')}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: '#ffffff',
                fontWeight: 600,
              }}
            >
              Ver Médicos
            </Button>
          </Group>
        </Box>
      </Paper>

      <StatisticsCards stats={stats} />

      <Title order={3} fw={700} mt="xl" mb="md" style={{ letterSpacing: '-0.01em' }}>
        Próximas Citas Médicas
      </Title>

      {upcoming.length === 0 ? (
        <Paper p="xl" style={{ textAlign: 'center', borderRadius: 32, border: '1px dashed var(--mantine-color-gray-4)' }}>
          <Title order={4} fw={600} mb="xs">
            No tienes citas agendadas próximamente
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            Puedes buscar especialistas por especialidad y reservar tu consulta en minutos.
          </Text>
          <Button size="sm" onClick={() => navigate('/appointments')}>
            Agendar una Cita Ahora
          </Button>
        </Paper>
      ) : (
        upcoming.map(appt => <AppointmentCard key={appt.id} appointment={appt} onCancel={cancelAppointment} />)
      )}
    </Box>
  )
}
