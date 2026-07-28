import { SimpleGrid } from '@mantine/core'
import { IconCalendarMonth, IconCalendarCheck, IconBuildingHospital, IconUsers } from '@tabler/icons-react'
import DashboardCards from './DashboardCards'

export default function StatisticsCards({ stats }) {
  const cards = [
    { title: 'Citas Programadas', value: stats.scheduled, icon: IconCalendarMonth, color: '#1976d2', subtitle: 'Total de citas activas' },
    { title: 'Próximas Citas', value: stats.upcoming, icon: IconCalendarCheck, color: '#2e7d32', subtitle: 'Para los próximos 7 días' },
    { title: 'Especialidades', value: stats.specialties, icon: IconBuildingHospital, color: '#f57c00', subtitle: 'Áreas médicas disponibles' },
    { title: 'Médicos Disponibles', value: stats.availableDoctors, icon: IconUsers, color: '#7b1fa2', subtitle: 'En turno actual' },
  ]

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
      {cards.map(card => <DashboardCards key={card.title} {...card} />)}
    </SimpleGrid>
  )
}
