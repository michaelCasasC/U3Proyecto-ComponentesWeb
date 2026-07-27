import { useEffect, useState } from 'react'
import { Box, Typography, Paper, Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import ConfirmationDialog from '../components/common/ConfirmationDialog'
import { useAppointments } from '../context/AppointmentsContext'
import { useNotification } from '../context/NotificationContext'
import { api } from '../services/api'

const statusColors = {
  Pendiente: 'warning',
  Confirmada: 'info',
  Cancelada: 'error',
  Finalizada: 'success',
}

const adminTabs = ['Médicos', 'Especialidades', 'Pacientes', 'Citas']

export default function AdminPage() {
  const [tab, setTab] = useState(0)
  const { appointments, updateStatus } = useAppointments()
  const { showNotification } = useNotification()
  const [dialog, setDialog] = useState({ open: false, mode: 'add', data: null })
  const [confirmDelete, setConfirmDelete] = useState({ open: false, data: null })
  const [formData, setFormData] = useState({})
  const [doctorsData, setDoctorsData] = useState([])
  const [specialtiesData, setSpecialtiesData] = useState([])
  const [patientsData, setPatientsData] = useState([])

  const loadAdminData = async () => {
    try {
      const [doctorRows, specialtyRows, patientRows] = await Promise.all([api.getDoctors(), api.getSpecialties(), api.getUsers()])
      setDoctorsData(doctorRows)
      setSpecialtiesData(specialtyRows)
      setPatientsData(patientRows)
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  useEffect(() => { loadAdminData() }, [])

  const handleEdit = (row) => {
    setFormData(row)
    setDialog({ open: true, mode: 'edit', data: row })
  }

  const handleDelete = (row) => {
    setConfirmDelete({ open: true, data: row })
  }

  const confirmDeleteAction = async () => {
    try {
      const id = confirmDelete.data?.id
      if (tab === 0) await api.deleteDoctor(id)
      if (tab === 1) await api.deleteSpecialty(id)
      if (tab === 2) await api.deleteUser(id)
      if (tab === 3) await api.deleteAppointment(id)
      await loadAdminData()
      showNotification(`${confirmDelete.data?.name || confirmDelete.data?.patientName || 'Registro'} eliminado`, 'success')
      setConfirmDelete({ open: false, data: null })
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  const handleSave = async () => {
    try {
      if (tab === 0) {
        const specialtyId = formData.specialtyId || specialtiesData.find(item => item.name === (formData.description || formData.specialty))?.id || specialtiesData[0]?.id
        const payload = { ...formData, specialtyId }
        if (dialog.mode === 'add') await api.createDoctor(payload)
        else await api.updateDoctor(formData.id, payload)
      } else if (tab === 1) {
        if (dialog.mode === 'add') await api.createSpecialty(formData)
        else await api.updateSpecialty(formData.id, formData)
      } else {
        throw new Error('Este registro se gestiona desde su flujo correspondiente.')
      }
      await loadAdminData()
      showNotification(dialog.mode === 'add' ? 'Registro creado' : 'Registro actualizado', 'success')
      setDialog({ open: false, data: null })
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  const doctorColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'specialty', headerName: 'Especialidad', width: 150 },
    { field: 'experience', headerName: 'Experiencia (años)', width: 150 },
    { field: 'rating', headerName: 'Calificación', width: 120 },
    { field: 'available', headerName: 'Disponible', width: 120, renderCell: (params) => params.value ? 'Sí' : 'No' },
  ]

  const specialtyColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 350 },
    { field: 'doctorsCount', headerName: 'Médicos', width: 100 },
  ]

  const patientColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Rol', width: 120 },
  ]

  const appointmentColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'patientName', headerName: 'Paciente', width: 160 },
    { field: 'doctorName', headerName: 'Médico', width: 180 },
    { field: 'specialty', headerName: 'Especialidad', width: 140 },
    { field: 'date', headerName: 'Fecha', width: 120 },
    { field: 'time', headerName: 'Hora', width: 100 },
    { field: 'status', headerName: 'Estado', width: 130, renderCell: (params) => (
      <Typography variant="body2" sx={{ color: `${statusColors[params.value]}.main`, fontWeight: 600 }}>{params.value}</Typography>
    )},
  ]

  const getRows = () => {
    switch(tab) {
      case 0: return doctorsData
      case 1: return specialtiesData
      case 2: return patientsData
      case 3: return appointments
      default: return []
    }
  }

  const getColumns = () => {
    switch(tab) {
      case 0: return doctorColumns
      case 1: return specialtyColumns
      case 2: return patientColumns
      case 3: return appointmentColumns
      default: return []
    }
  }

  return (
    <Box>
      <Breadcrumb />
      <PageHeader
        title="Administración"
        subtitle="Gestión completa del sistema"
        action={
          <Button variant="contained" onClick={() => { setFormData({}); setDialog({ open: true, mode: 'add', data: null }) }}>
            Agregar {adminTabs[tab].slice(0, -1)}
          </Button>
        }
      />
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {adminTabs.map(t => <Tab key={t} label={t} />)}
      </Tabs>
      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={getRows()}
          columns={getColumns()}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
          sx={{ border: 'none' }}
        />
      </Paper>
      <ConfirmationDialog
        open={confirmDelete.open}
        title="Confirmar Eliminación"
        message={`¿Está seguro de eliminar este registro?`}
        onConfirm={confirmDeleteAction}
        onCancel={() => setConfirmDelete({ open: false })}
      />
      <Dialog open={dialog.open} onClose={() => setDialog({ open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.mode === 'add' ? 'Agregar' : 'Editar'} {adminTabs[tab].slice(0, -1)}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField fullWidth label="Nombre" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} sx={{ mb: 2 }} />
            <TextField fullWidth label="Descripción" value={formData.description || formData.specialty || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} sx={{ mb: 2 }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false })}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
