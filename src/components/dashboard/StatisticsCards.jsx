import { Box } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PeopleIcon from '@mui/icons-material/People'
import DashboardCards from './DashboardCards'

export default function StatisticsCards({ stats }) {
  const cards = [
    { title: 'Citas Programadas', value: stats.scheduled, icon: CalendarMonthIcon, color: '#1976d2', subtitle: 'Total de citas activas' },
    { title: 'Próximas Citas', value: stats.upcoming, icon: EventAvailableIcon, color: '#2e7d32', subtitle: 'Para los próximos 7 días' },
    { title: 'Especialidades', value: stats.specialties, icon: LocalHospitalIcon, color: '#f57c00', subtitle: 'Áreas médicas disponibles' },
    { title: 'Médicos Disponibles', value: stats.availableDoctors, icon: PeopleIcon, color: '#7b1fa2', subtitle: 'En turno actual' },
  ]

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
      {cards.map(card => <DashboardCards key={card.title} {...card} />)}
    </Box>
  )
}
