import { useState } from 'react'
import { Box, Tabs, Title, Group } from '@mantine/core'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../context/AppointmentsContext'
import AppointmentCard from '../components/appointments/AppointmentCard'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import EmptyState from '../components/common/EmptyState'

const statusTabs = ['Todas', 'Pendiente', 'Confirmada', 'Finalizada', 'Cancelada']

export default function HistoryPage() {
  const { user } = useAuth()
  const { appointments, cancelAppointment } = useAppointments()
  const [tab, setTab] = useState(0)

  const userAppointments = appointments.filter(a => a.patientId === user?.id)
  const filtered = tab === 0 ? userAppointments : userAppointments.filter(a => a.status === statusTabs[tab])

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Historial de Citas" subtitle={`${userAppointments.length} citas registradas`} />
      <Tabs value={tab.toString()} onChange={(value) => setTab(Number(value))} mb="md">
        <Tabs.List>
          {statusTabs.map((s, i) => (
            <Tabs.Tab key={s} value={i.toString()}>{s}</Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      {filtered.length === 0 ? (
        <EmptyState message="No hay citas en esta categoría" />
      ) : (
        filtered.map(appt => <AppointmentCard key={appt.id} appointment={appt} onCancel={cancelAppointment} />)
      )}
    </Box>
  )
}
