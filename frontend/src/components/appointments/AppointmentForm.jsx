import { useEffect, useState } from 'react'
import { Box, Grid, MenuItem } from '@mui/material'
import CustomTextField from '../common/CustomTextField'
import CustomButton from '../common/CustomButton'
import EventIcon from '@mui/icons-material/Event'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'

const timeSlots = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']

export default function AppointmentForm({ doctors, specialties, selectedDoctor, selectedDate, onSubmit }) {
  const [form, setForm] = useState({ doctorId: selectedDoctor?.id || '', specialty: selectedDoctor?.specialty || '', date: '', time: '' })

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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField select label="Especialidad" value={form.specialty} onChange={(e) => setForm(prev => ({ ...prev, specialty: e.target.value }))} icon={MedicalServicesIcon}>
            <MenuItem value="">Seleccionar especialidad</MenuItem>
            {specialties.map(s => <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>)}
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField select label="Médico" value={form.doctorId} onChange={(e) => handleChange('doctorId', e.target.value)} icon={PersonIcon}>
            <MenuItem value="">Seleccionar médico</MenuItem>
            {doctors.filter(d => !form.specialty || d.specialty === form.specialty).map(d => (
              <MenuItem key={d.id} value={d.id}>{d.name} - {d.specialty}</MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField type="date" label="Fecha" value={form.date} onChange={(e) => handleChange('date', e.target.value)} icon={EventIcon} slotProps={{ inputLabel: { shrink: true } }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField select label="Horario" value={form.time} onChange={(e) => handleChange('time', e.target.value)} icon={AccessTimeIcon}>
            <MenuItem value="">Seleccionar horario</MenuItem>
            {timeSlots.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomButton type="submit" fullWidth disabled={!form.doctorId || !form.date || !form.time}>
            Solicitar Cita
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}
