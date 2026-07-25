import { useState } from 'react'
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material'
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
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {statusTabs.map(s => <Tab key={s} label={s} />)}
      </Tabs>
      {filtered.length === 0 ? (
        <EmptyState message="No hay citas en esta categoría" />
      ) : (
        filtered.map(appt => <AppointmentCard key={appt.id} appointment={appt} onCancel={cancelAppointment} />)
      )}
    </Box>
  )
}
