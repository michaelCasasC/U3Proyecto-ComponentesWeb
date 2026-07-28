import { useEffect, useState } from 'react'
import { Box, Tabs, Button, Modal, TextInput, Text, Group, Paper, Badge } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import ConfirmationDialog from '../components/common/ConfirmationDialog'
import ReusableTable from '../components/tables/ReusableTable'
import { useAppointments } from '../context/AppointmentsContext'
import { useNotification } from '../context/NotificationContext'
import { api } from '../services/api'

const statusColors = {
  Pendiente: 'yellow',
  Confirmada: 'blue',
  Cancelada: 'red',
  Finalizada: 'green',
}

const adminTabs = ['Médicos', 'Especialidades', 'Pacientes', 'Citas']

export default function AdminPage() {
  const [tab, setTab] = useState(0)
  const { appointments, updateStatus } = useAppointments()
  const { showNotification } = useNotification()
  const [opened, { open, close }] = useDisclosure(false)
  const [dialogMode, setDialogMode] = useState('add')
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
    setDialogMode('edit')
    open()
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
        if (dialogMode === 'add') await api.createDoctor(payload)
        else await api.updateDoctor(formData.id, payload)
      } else if (tab === 1) {
        if (dialogMode === 'add') await api.createSpecialty(formData)
        else await api.updateSpecialty(formData.id, formData)
      } else {
        throw new Error('Este registro se gestiona desde su flujo correspondiente.')
      }
      await loadAdminData()
      showNotification(dialogMode === 'add' ? 'Registro creado' : 'Registro actualizado', 'success')
      close()
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  const doctorColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Nombre' },
    { field: 'specialty', headerName: 'Especialidad' },
    { field: 'experience', headerName: 'Experiencia (años)' },
    { field: 'rating', headerName: 'Calificación' },
    { field: 'available', headerName: 'Disponible', render: (row) => row.available ? 'Sí' : 'No' },
  ]

  const specialtyColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Nombre' },
    { field: 'description', headerName: 'Descripción' },
    { field: 'doctorsCount', headerName: 'Médicos' },
  ]

  const patientColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Nombre' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Rol' },
  ]

  const appointmentColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'patientName', headerName: 'Paciente' },
    { field: 'doctorName', headerName: 'Médico' },
    { field: 'specialty', headerName: 'Especialidad' },
    { field: 'date', headerName: 'Fecha' },
    { field: 'time', headerName: 'Hora' },
    { field: 'status', headerName: 'Estado', render: (row) => (
      <Badge color={statusColors[row.status] || 'gray'} variant="light" size="sm">{row.status}</Badge>
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
          <Button onClick={() => { setFormData({}); setDialogMode('add'); open() }}>
            Agregar {adminTabs[tab].slice(0, -1)}
          </Button>
        }
      />
      <Tabs value={tab.toString()} onChange={(value) => setTab(Number(value))} mb="md">
        <Tabs.List>
          {adminTabs.map((t, i) => (
            <Tabs.Tab key={t} value={i.toString()}>{t}</Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <ReusableTable
        columns={getColumns()}
        rows={getRows()}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmationDialog
        open={confirmDelete.open}
        title="Confirmar Eliminación"
        message="¿Está seguro de eliminar este registro?"
        onConfirm={confirmDeleteAction}
        onCancel={() => setConfirmDelete({ open: false })}
      />

      <Modal opened={opened} onClose={close} title={`${dialogMode === 'add' ? 'Agregar' : 'Editar'} ${adminTabs[tab].slice(0, -1)}`} size="sm">
        <TextInput label="Nombre" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} mb="md" />
        <TextInput label="Descripción" value={formData.description || formData.specialty || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} mb="md" />
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={close}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </Group>
      </Modal>
    </Box>
  )
}
